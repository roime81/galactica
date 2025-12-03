# **App Name**: DataFlow AI Lake

## Core Features:

- Multi-Source Data Ingestion: Connect to various data sources (APIs, CSV/Excel, external databases, streaming feeds) using Firebase Cloud Functions and Storage triggers.
- Data Validation & Metadata Storage: Validate ingested data, log ingestion jobs, and store metadata (status, timestamps, source) in Firestore.
- Medallion Architecture Layers: Implement Bronze (raw data in Storage), Silver (curated data in Firestore), and Gold (analytics-ready data in Firestore) layers with schema evolution and transformation logic.
- LLM-Powered Q&A: Enable natural language Q&A for Gold-layer data using Gemma or Llama 3 (via API), performing RAG on document chunks stored in Cloud Storage and Firestore, and automatically summarize Silver-layer data. Uses tool for reasoning on if/when to incorporate info into outputs.
- Open Source Data Catalog Integration: Integrate with OpenMetadata or DataHub to capture and sync metadata (schema, quality, lineage) from Firestore using Cloud Functions and APIs.
- Firestore Schema for Embeddings: Employ a custom schema in Firestore to house vector embeddings, essential for efficient embedding-based search functionalities.
- End-to-End Data Flow Visualization: Visualize the entire data flow from ingestion to AI summarization to catalog update. Example: 'Hospital system sends patient data -> Bronze -> Silver mapping -> Gold KPI tables -> LLM generates AI summary -> catalog updated'.

## Style Guidelines:

- Primary color: Dark blue (#3F51B5) to convey data security, stability, and professionalism, reflecting the sensitive nature of data management and analytics.
- Background color: Very light gray (#F5F5F5) to provide a clean and neutral backdrop, ensuring focus remains on the data visualizations and architecture.
- Accent color: Teal (#009688) to highlight interactive elements and key data points, providing a sense of innovation and analytical precision.
- Body and headline font: 'Inter' sans-serif for a modern, machined, objective, neutral look; suitable for headlines or body text.
- Use minimalist and consistent icons to represent data sources, processing steps, and layers within the architecture.
- Employ a modular and structured layout to represent each component (data source, layer, LLM) in a clear and interconnected manner, facilitating understanding of the data flow.
- Implement subtle animations for data transitions and updates, providing real-time feedback on data processing and AI summarization.