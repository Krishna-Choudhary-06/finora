# Finora: Product Requirements Document (PRD)

## 1. Executive Summary
Finora is a comprehensive, AI-powered personal finance platform designed as a production-grade portfolio project. It enables users to track financial accounts, monitor transactions, manage budgets and investments, and receive AI-driven financial insights. Built with modern web technologies and a robust microservices-inspired monolithic architecture, Finora prioritizes financial data integrity, security, and a premium user experience while utilizing synthetic data for demonstration purposes.

## 2. Product Vision
To provide a unified, intelligent, and secure financial control center that demystifies personal finance, empowering users to make informed, data-driven decisions through advanced analytics and responsible AI assistance.

## 3. Target Users
1. **Students**: Needing basic budgeting and expense tracking on a tight income.
2. **Young Professionals**: Looking to build wealth, manage first-time salaries, and set financial goals.
3. **Working Adults**: Managing complex multi-account finances, investments, and long-term planning.
4. **Holistic Financial Trackers**: Users seeking a unified "single pane of glass" view for their entire financial landscape.

## 4. User Personas
- **"Budget-Conscious" Brian**: A recent grad who needs strict categorization to avoid overspending and wants alerts when approaching limits.
- **"Wealth-Builder" Wendy**: A mid-level professional heavily focused on investment tracking, net worth growth, and AI-driven forecasting.
- **"Set-and-Forget" Sam**: A busy parent who wants automated categorization, weekly summary reports, and low-friction financial check-ins.

## 5. User Problems
Users lack a consolidated view of their finances, making it difficult to understand:
- Current liquidity (how much money they actually have).
- Cash flow patterns (where the money goes).
- Adherence to financial guardrails (budgets).
- Portfolio performance (investments).
- Progress towards milestones (goals).
- Actionable next steps based on financial trends.

## 6. Product Goals
- Provide a responsive, high-performance web application for end-to-end personal finance management.
- Demonstrate production-level engineering including strict validations, resilient architectures, and clean code.
- Implement a secure, hallucination-free AI assistant strictly constrained to the user's synthetic financial data.
- Ensure 100% financial data integrity, preventing double-counting, race conditions, or orphaned records.

## 7. Non-goals
- **Real Bank Connectivity**: No Plaid/Yodlee integrations for real account syncing in the initial versions; strictly synthetic/demo data.
- **Real Trading/Execution**: No ability to buy/sell assets on the platform.
- **Tax Filing**: Not designed to be a certified tax preparation software.
- **B2B / Corporate Finance**: Strictly designed for personal (individual/household) finance.

## 8. Core Features & 9. Feature Priorities
*(P0 = Mandatory MVP, P1 = Important, P2 = Future Enhancement)*

- **Authentication & Identity**: JWT-based secure login, registration, password reset. (P0)
- **User Profile**: Management of user preferences, timezones, and base currencies. (P1)
- **Accounts**: Creation and management of synthetic depository, credit, and investment accounts. (P0)
- **Transactions**: Double-entry ledger system for tracking income, expenses, and transfers. (P0)
- **Financial Ledger**: Immutable record-keeping mechanism preventing deletion of settled records. (P0)
- **Categories**: Multi-level categorization of transactions. (P0)
- **Budgets**: Threshold-based spending limits linked to categories. (P0)
- **Financial Goals**: Target-based savings tracking. (P1)
- **Investments**: Manual portfolio tracking and synthetic performance metrics. (P1)
- **Analytics**: Dashboards for cash flow, net worth, and spending trends. (P0)
- **Forecasting**: Projections based on historical data. (P2)
- **Notifications**: System and email alerts for budgets, goals, and security events. (P1)
- **Reports**: Downloadable PDF/CSV summaries of financial periods. (P1)
- **AI Financial Intelligence**: Automated insights generated via background workers. (P1)
- **AI Financial Assistant**: Chat interface for querying user-specific financial data. (P2)
- **Audit Logs**: Immutable tracking of sensitive user actions. (P0)
- **Administration**: Back-office dashboard for system health and demo user management. (P2)

## 10. User Journeys
- **Onboarding**: User signs up -> completes profile -> generates/inputs synthetic accounts -> dashboard populates with initial data.
- **Daily Check-in**: User logs in -> views net worth dashboard -> checks recent transactions -> interacts with AI to ask "How much did I spend on food this week?".
- **Budgeting**: User creates a "Groceries" budget -> records a transaction -> system updates budget progress -> triggers an alert if >90% consumed.
- **Month-End Review**: User navigates to Reports -> generates a monthly summary -> reviews AI-generated insights on spending anomalies.

## 11. Functional Requirements
- **Ledger Logic**: All transactions must balance. A transfer must deduct from one account and add to another within a single atomic database transaction.
- **Categorization**: Transactions can belong to one primary category.
- **AI Constraints**: The LLM must be provided context explicitly through tools. It cannot access the internet or guess market conditions.

## 12. Non-functional Requirements
- **Performance**: API endpoints must respond in < 200ms (excluding external AI calls).
- **Availability**: System architected to support 99.9% uptime (containerized, stateless API).
- **Scalability**: Background tasks (analytics, reports) processed asynchronously via BullMQ.
- **Code Quality**: Strict ESLint/Prettier enforcement, 100% TypeScript coverage.

## 13. Security Requirements
- Passwords hashed using Argon2 or bcrypt.
- JWT tokens with short expirations and secure, HttpOnly refresh tokens.
- Rate limiting on all public and authenticated API routes to prevent abuse.
- Input validation on all endpoints using Zod.
- Prevention of IDOR (Insecure Direct Object Reference) by asserting ownership on every data fetch.

## 14. Privacy Requirements
- Data isolation: A user must never be able to query another user's financial records.
- Soft deletes for user data (or hard deletes upon explicit account deletion request).
- No PII (Personally Identifiable Information) logged in plain text application logs.

## 15. Financial-data Integrity Requirements
- **Atomic Transactions**: Transfers and multi-leg financial events must be wrapped in ACID-compliant SQL transactions.
- **Precision**: Monetary values must be stored in the smallest currency unit (e.g., cents) as integers to prevent floating-point math errors.
- **Concurrency**: Optimistic locking or strict row-level locking (e.g., `SELECT ... FOR UPDATE`) during balance updates to prevent race conditions.
- **Immutability**: Once a transaction is settled, it should ideally be offset by a reversing transaction rather than deleted (soft deletes with audit trails).

## 16. AI Requirements
- **Strict Context Boundary**: The AI must only answer questions based on the specific user's database records.
- **No Hallucination**: AI must be prompted to say "I don't have enough data" rather than inventing financial figures.
- **Read-Only**: The AI assistant can query data (GET) but cannot execute transactions or modify budgets (POST/PUT/DELETE) in the MVP.

## 17. Accessibility Requirements
- Compliance with WCAG 2.1 AA standards.
- Semantic HTML, ARIA labels for dynamic components, and full keyboard navigability.
- Sufficient color contrast for data visualizations (charts/graphs).

## 18. Responsive/Mobile Requirements
- Mobile-first CSS (Tailwind).
- Complex tables must gracefully degrade into card layouts on small screens.
- Touch-friendly tap targets (minimum 44x44px) for all primary actions.

## 19. Error/Loading/Empty-State Requirements
- **Loading**: Skeleton loaders for all data-fetching components to prevent layout shift.
- **Errors**: User-friendly error boundaries. Never expose raw stack traces to the client.
- **Empty States**: Action-oriented empty states (e.g., "No transactions yet. [Add your first transaction]").

## 20. Analytics Requirements
- Track anonymized user engagement (e.g., feature adoption) internally.
- Dashboard charts must support dynamic timeframes (1W, 1M, 3M, 1Y, YTD, ALL).

## 21. Notification Requirements
- In-app notification center.
- Email delivery via background worker queue (simulated or real SMTP).
- Configurable user preferences (e.g., turn off weekly summary emails).

## 22. Reporting Requirements
- Asynchronous report generation.
- Support for CSV exports of ledger data.
- PDF generation for structured monthly statements.

## 23. Admin Requirements
- Admin role to view system metrics (active users, error rates, queue health).
- Ability to impersonate/view synthetic demo accounts for debugging (strictly controlled).

## 24. MVP Scope (P0)
- User Auth, synthetic Account creation, manual Transaction entry, double-entry ledger, basic Categories, simple Budgets, and the core Analytics dashboard.

## 25. Post-MVP Scope (P1 & P2)
- Investment tracking, Financial Goals, AI Insights & Chat, PDF Reporting, Forecasting, and advanced notification systems.

## 26. Future Open Banking Scope
- Plaid API sandbox integration to demonstrate how real-world OAuth bank syncing would replace the synthetic data generation.

## 27. Success Metrics
- **Technical**: 80%+ unit test coverage, 0 critical security vulnerabilities, 100% successful synthetic data load without race conditions.
- **Product**: Seamless user journey from signup to first dashboard interaction in under 2 minutes.

## 28. Risks
- **Complexity of Double-Entry**: High risk of bugs in balance calculation. Mitigation: Comprehensive test suite for the ledger module.
- **AI Token Limits**: High cost or latency if context windows are flooded with too many transactions. Mitigation: Pre-aggregate data before feeding to the LLM.

## 29. Assumptions
- Users are comfortable manually entering or bulk-generating their initial synthetic data.
- Application will be deployed on standard cloud infrastructure (e.g., AWS/Vercel) capable of running Node.js and PostgreSQL.

## 30. Acceptance Criteria
- **Accounts**: A user can create an account and the balance perfectly reflects the sum of its transactions.
- **Transactions**: Concurrent requests to create transactions do not result in corrupted account balances (proven via load testing).
- **AI**: Querying "What is my balance?" returns the exact integer value found in the database, not an approximation.
- **Security**: Attempting to access `/api/modules/accounts/1` with a token belonging to the owner of account 2 returns a `403 Forbidden`.
