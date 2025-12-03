"use server";

import { summarizeSilverData } from "@/ai/flows/auto-summarize-silver-data";
import { llmPoweredQA } from "@/ai/flows/llm-powered-qa";

const silverData = JSON.stringify(
  [
    { patient_id: "P001", age: 45, condition: "Hypertension", last_visit: "2023-10-15", vitals: { bp: "140/90", hr: 75 } },
    { patient_id: "P002", age: 34, condition: "Diabetes Type 2", last_visit: "2023-10-20", vitals: { glucose: 150 } },
    { patient_id: "P003", age: 55, condition: "Asthma", last_visit: "2023-09-30", vitals: { fev1: "2.5L" } },
    { patient_id: "P004", age: 62, condition: "Hypertension", last_visit: "2023-10-22", vitals: { bp: "150/95", hr: 80 } },
    { patient_id: "P005", age: 28, condition: "Healthy", last_visit: "2023-10-18", vitals: {} },
  ],
  null,
  2
);

const goldData = JSON.stringify(
  {
    total_patients: 150,
    average_age: 52.3,
    active_conditions_count: { Hypertension: 45, "Diabetes Type 2": 30, Asthma: 25, Other: 50 },
    visits_last_30_days: 78,
    hypertension_management_effectiveness: "75% of patients have BP under control.",
    key_insights: "Increase in Diabetes Type 2 diagnoses among patients under 40.",
  },
  null,
  2
);

export async function getSilverSummary() {
  try {
    const result = await summarizeSilverData({ data: silverData });
    return { summary: result.summary, error: null };
  } catch (error) {
    console.error("Error in getSilverSummary:", error);
    return { summary: null, error: "Failed to generate summary. Please check the server logs." };
  }
}

export async function getGoldAnswer(question: string) {
  if (!question) {
    return { answer: null, error: "Question cannot be empty." };
  }
  try {
    const result = await llmPoweredQA({ question, data: goldData });
    return { answer: result.answer, error: null };
  } catch (error) {
    console.error("Error in getGoldAnswer:", error);
    return { answer: null, error: "Failed to get an answer. Please check the server logs." };
  }
}
