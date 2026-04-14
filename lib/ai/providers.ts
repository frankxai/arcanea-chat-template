import { customProvider, gateway } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createGroq } from "@ai-sdk/groq";
import { isTestEnvironment } from "../constants";
import { titleModel } from "./models";

export const myProvider = isTestEnvironment
  ? (() => {
      const { chatModel, titleModel } = require("./models.mock");
      return customProvider({
        languageModels: {
          "chat-model": chatModel,
          "title-model": titleModel,
        },
      });
    })()
  : null;

/**
 * BYOK (Bring Your Own Key) overrides.
 * When a client sends x-byok-provider + x-byok-key headers, we use those
 * credentials directly — the key NEVER touches our database or logs.
 * Falls back to Vercel AI Gateway otherwise.
 */
export type BYOKContext = {
  provider?: "openai" | "anthropic" | "google" | "openrouter" | "groq";
  apiKey?: string;
};

export function getLanguageModel(modelId: string, byok?: BYOKContext) {
  if (isTestEnvironment && myProvider) {
    return myProvider.languageModel(modelId);
  }

  if (byok?.apiKey && byok.provider) {
    // Strip "provider/" prefix from modelId if present (gateway format)
    const rawId = modelId.includes("/") ? modelId.split("/").slice(1).join("/") : modelId;

    switch (byok.provider) {
      case "openai":
        return createOpenAI({ apiKey: byok.apiKey }).chat(rawId);
      case "anthropic":
        return createAnthropic({ apiKey: byok.apiKey })(rawId);
      case "google":
        return createGoogleGenerativeAI({ apiKey: byok.apiKey })(rawId);
      case "groq":
        return createGroq({ apiKey: byok.apiKey })(rawId);
      case "openrouter":
        // OpenRouter uses OpenAI-compatible API
        return createOpenAI({
          apiKey: byok.apiKey,
          baseURL: "https://openrouter.ai/api/v1",
        }).chat(rawId);
    }
  }

  return gateway.languageModel(modelId);
}

export function getTitleModel() {
  if (isTestEnvironment && myProvider) {
    return myProvider.languageModel("title-model");
  }
  return gateway.languageModel(titleModel.id);
}
