# Creating agents.md Files for Your Projects

This guide explains how to create effective `agents.md` files for application repositories that you place under the `repos/` folder for review or development with IBM Bob.

## What is agents.md?

An `agents.md` file helps AI agents (like Bob) understand your application codebase by providing:
- Project structure and architecture overview
- Key conventions and patterns used
- Build, test, and deployment instructions
- Important context that isn't obvious from code alone

## When to Create agents.md

Create an `agents.md` file for:
- ✅ Application repositories under `repos/`
- ✅ Projects with complex architecture
- ✅ Codebases with specific conventions
- ✅ Multi-service or microservice architectures
- ✅ Projects with non-standard build processes

Don't create `agents.md` for:
- ❌ This Bob configuration template (already documented)
- ❌ Simple scripts or utilities
- ❌ Well-documented projects where README.md is sufficient

## File Location

Place `agents.md` at the **root of your application repository**:

```
repos/
└── your-application/
    ├── agents.md          ← Place here
    ├── README.md
    ├── src/
    ├── tests/
    └── package.json
```

## Template Structure

```markdown
# AI Agents Configuration

## Project Overview

[Brief description of what this application does]

## Repository Structure

```
your-application/
├── src/                 # Source code
│   ├── api/            # API endpoints
│   ├── services/       # Business logic
│   └── models/         # Data models
├── tests/              # Test files
├── docs/               # Documentation
└── config/             # Configuration files
```

## Architecture

[Describe the high-level architecture]
- Architecture pattern (e.g., MVC, microservices, event-driven)
- Key components and their responsibilities
- Data flow and communication patterns

## Key Technologies

- **Language**: [e.g., Python 3.11, Node.js 18, Go 1.21]
- **Framework**: [e.g., FastAPI, Express, Gin]
- **Database**: [e.g., PostgreSQL, MongoDB, Redis]
- **Infrastructure**: [e.g., Docker, Kubernetes, AWS]

## Development Setup

### Prerequisites
- [List required tools and versions]

### Installation
```bash
# Commands to set up the project
```

### Running Locally
```bash
# Commands to run the application
```

### Running Tests
```bash
# Commands to run tests
```

## Code Conventions

### File Naming
- [Describe naming conventions]

### Code Style
- [Describe style guide or linter used]

### Architecture Patterns
- [Describe patterns used in the codebase]

## Important Context

### Authentication
[How authentication works in this project]

### Configuration
[How configuration is managed]

### Error Handling
[Error handling approach]

### Logging
[Logging strategy and conventions]

## Common Tasks

### Adding a New Feature
[Step-by-step guide]

### Fixing a Bug
[Debugging approach and tools]

### Database Migrations
[How to handle schema changes]

## Deployment

### Environments
- Development: [details]
- Staging: [details]
- Production: [details]

### Deployment Process
[How to deploy the application]

## Testing Strategy

- **Unit Tests**: [Location and approach]
- **Integration Tests**: [Location and approach]
- **E2E Tests**: [Location and approach]

## Dependencies

### Critical Dependencies
[List and explain critical dependencies]

### Updating Dependencies
[Process for updating dependencies]

## Troubleshooting

### Common Issues
[List common issues and solutions]

### Debug Mode
[How to enable debug mode]

## Additional Resources

- [Link to API documentation]
- [Link to architecture diagrams]
- [Link to team wiki]
```

## Example 1: Web Application

```markdown
# AI Agents Configuration

## Project Overview

E-commerce platform built with React frontend and Node.js backend. Handles product catalog, shopping cart, and order processing.

## Repository Structure

```
ecommerce-app/
├── frontend/           # React application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Page components
│   │   ├── hooks/      # Custom React hooks
│   │   └── api/        # API client functions
│   └── package.json
├── backend/            # Node.js API
│   ├── src/
│   │   ├── routes/     # Express routes
│   │   ├── controllers/# Request handlers
│   │   ├── services/   # Business logic
│   │   ├── models/     # Mongoose models
│   │   └── middleware/ # Express middleware
│   └── package.json
└── docker-compose.yml
```

## Architecture

**Pattern**: Three-tier architecture (Frontend → API → Database)

- **Frontend**: React SPA with Redux for state management
- **Backend**: RESTful API built with Express.js
- **Database**: MongoDB for product catalog and orders
- **Cache**: Redis for session management and cart data

## Key Technologies

- **Frontend**: React 18, Redux Toolkit, Material-UI
- **Backend**: Node.js 18, Express 4, Mongoose
- **Database**: MongoDB 6.0, Redis 7.0
- **Infrastructure**: Docker, Docker Compose

## Development Setup

### Prerequisites
- Node.js 18+
- Docker and Docker Compose
- MongoDB Compass (optional, for database inspection)

### Installation
```bash
# Install frontend dependencies
cd frontend && npm install

# Install backend dependencies
cd ../backend && npm install
```

### Running Locally
```bash
# Start MongoDB and Redis with Docker
docker-compose up -d

# Start backend (runs on port 3001)
cd backend && npm run dev

# Start frontend (runs on port 3000)
cd frontend && npm start
```

### Running Tests
```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test

# E2E tests
npm run test:e2e
```

## Code Conventions

### File Naming
- React components: PascalCase (e.g., `ProductCard.jsx`)
- Utilities and hooks: camelCase (e.g., `useAuth.js`)
- API routes: kebab-case (e.g., `product-routes.js`)

### Code Style
- ESLint with Airbnb config
- Prettier for formatting
- Run `npm run lint` before committing

### Architecture Patterns
- **Frontend**: Container/Presentational component pattern
- **Backend**: Controller-Service-Repository pattern
- **API**: RESTful conventions with versioning (`/api/v1/`)

## Important Context

### Authentication
- JWT-based authentication
- Tokens stored in httpOnly cookies
- Refresh token rotation implemented
- Auth middleware in `backend/src/middleware/auth.js`

### Configuration
- Environment variables in `.env` files (see `.env.example`)
- Frontend config in `frontend/src/config.js`
- Backend config in `backend/src/config/index.js`

### Error Handling
- Custom error classes in `backend/src/utils/errors.js`
- Global error handler middleware
- Frontend error boundaries for React components

### Logging
- Winston logger in backend (`backend/src/utils/logger.js`)
- Log levels: error, warn, info, debug
- Logs written to `logs/` directory and console

## Common Tasks

### Adding a New API Endpoint
1. Create route in `backend/src/routes/`
2. Create controller in `backend/src/controllers/`
3. Create service in `backend/src/services/`
4. Add tests in `backend/tests/`
5. Update API documentation

### Adding a New React Component
1. Create component in `frontend/src/components/`
2. Create corresponding test file
3. Add to component index if reusable
4. Update Storybook if applicable

### Database Migrations
- Mongoose handles schema evolution automatically
- For breaking changes, create migration script in `backend/migrations/`
- Run with `npm run migrate`

## Deployment

### Environments
- **Development**: Local Docker setup
- **Staging**: AWS ECS with RDS MongoDB
- **Production**: AWS ECS with MongoDB Atlas

### Deployment Process
1. Merge to `main` branch
2. CI/CD pipeline runs tests
3. Docker images built and pushed to ECR
4. ECS service updated with new images
5. Health checks verify deployment

## Testing Strategy

- **Unit Tests**: Jest for both frontend and backend
  - Frontend: `frontend/src/**/*.test.jsx`
  - Backend: `backend/tests/unit/**/*.test.js`
- **Integration Tests**: Supertest for API testing
  - Location: `backend/tests/integration/**/*.test.js`
- **E2E Tests**: Playwright for user flows
  - Location: `e2e/**/*.spec.js`

## Dependencies

### Critical Dependencies
- `express`: Web framework
- `mongoose`: MongoDB ODM
- `jsonwebtoken`: JWT authentication
- `react`: UI library
- `redux-toolkit`: State management

### Updating Dependencies
```bash
# Check for updates
npm outdated

# Update non-breaking changes
npm update

# Update major versions carefully
npm install package@latest
```

## Troubleshooting

### Common Issues

**MongoDB connection fails**
- Ensure Docker containers are running: `docker-compose ps`
- Check MongoDB logs: `docker-compose logs mongodb`

**Frontend can't reach backend**
- Verify backend is running on port 3001
- Check CORS configuration in `backend/src/app.js`

**Authentication errors**
- Clear cookies and local storage
- Check JWT_SECRET in `.env`
- Verify token expiration settings

### Debug Mode
```bash
# Backend with debug logging
DEBUG=app:* npm run dev

# Frontend with React DevTools
# Install React DevTools browser extension
```

## Additional Resources

- API Documentation: http://localhost:3001/api-docs (Swagger)
- Architecture Diagrams: `docs/architecture/`
- Team Wiki: https://wiki.company.com/ecommerce
```

## Example 2: Microservices Architecture

```markdown
# AI Agents Configuration

## Project Overview

Payment processing platform with microservices architecture. Handles payment authorization, settlement, and reconciliation.

## Repository Structure

```
payment-platform/
├── services/
│   ├── auth-service/       # Authentication & authorization
│   ├── payment-service/    # Payment processing
│   ├── settlement-service/ # Settlement & reconciliation
│   └── notification-service/ # Email/SMS notifications
├── shared/
│   ├── proto/             # Protocol buffer definitions
│   ├── events/            # Event schemas
│   └── utils/             # Shared utilities
├── infrastructure/
│   ├── k8s/              # Kubernetes manifests
│   ├── terraform/        # Infrastructure as code
│   └── docker/           # Dockerfiles
└── docs/
    ├── api/              # API documentation
    └── architecture/     # Architecture diagrams
```

## Architecture

**Pattern**: Event-driven microservices with CQRS

- **Communication**: gRPC for synchronous, Kafka for asynchronous
- **Data**: Each service has its own database (database per service pattern)
- **API Gateway**: Kong for external API access
- **Service Mesh**: Istio for service-to-service communication

### Service Responsibilities

- **auth-service**: User authentication, JWT issuance, permission management
- **payment-service**: Payment authorization, card tokenization, fraud detection
- **settlement-service**: Batch settlement, reconciliation, reporting
- **notification-service**: Email/SMS notifications, webhook delivery

## Key Technologies

- **Language**: Go 1.21
- **Framework**: gRPC, Gin (HTTP)
- **Message Broker**: Apache Kafka
- **Databases**: PostgreSQL (transactional), MongoDB (events)
- **Cache**: Redis
- **Infrastructure**: Kubernetes, Istio, Terraform

## Development Setup

### Prerequisites
- Go 1.21+
- Docker Desktop with Kubernetes enabled
- kubectl
- Helm 3
- Tilt (for local development)

### Installation
```bash
# Install dependencies for all services
make install-deps

# Generate protobuf code
make proto-gen

# Set up local Kubernetes cluster
make k8s-setup
```

### Running Locally
```bash
# Start all services with Tilt
tilt up

# Access Tilt UI at http://localhost:10350
```

### Running Tests
```bash
# Run all tests
make test

# Run tests for specific service
make test-service SERVICE=payment-service

# Run integration tests
make test-integration
```

## Code Conventions

### File Naming
- Go files: snake_case (e.g., `payment_handler.go`)
- Proto files: snake_case (e.g., `payment_service.proto`)
- Config files: kebab-case (e.g., `payment-service.yaml`)

### Code Style
- Follow Go standard style guide
- Use `gofmt` and `golangci-lint`
- Run `make lint` before committing

### Architecture Patterns
- **CQRS**: Separate read and write models
- **Event Sourcing**: Store events for audit trail
- **Saga Pattern**: Distributed transactions across services
- **Circuit Breaker**: Resilience for external calls

## Important Context

### Authentication
- OAuth 2.0 with JWT tokens
- Service-to-service auth via mTLS (Istio)
- API keys for external integrations
- Token validation in API Gateway

### Configuration
- Environment-specific configs in `infrastructure/k8s/overlays/`
- Secrets managed via Kubernetes Secrets
- Feature flags via ConfigMaps

### Error Handling
- Structured error responses with error codes
- Retry logic with exponential backoff
- Circuit breakers for external dependencies
- Dead letter queues for failed events

### Logging
- Structured logging with Zap
- Correlation IDs for request tracing
- Logs aggregated in ELK stack
- Log levels: debug, info, warn, error, fatal

## Common Tasks

### Adding a New Service
1. Copy service template: `make new-service NAME=my-service`
2. Define proto contracts in `shared/proto/`
3. Implement service logic
4. Add Kubernetes manifests in `infrastructure/k8s/`
5. Update Tiltfile for local development

### Adding a New Event
1. Define event schema in `shared/events/`
2. Update Kafka topic configuration
3. Implement producer in source service
4. Implement consumer in target service
5. Add event to documentation

### Database Migrations
- Use golang-migrate for schema changes
- Migrations in `services/*/migrations/`
- Run with `make migrate SERVICE=payment-service`
- Always test rollback: `make migrate-down SERVICE=payment-service`

## Deployment

### Environments
- **Development**: Local Kubernetes (Docker Desktop)
- **Staging**: AWS EKS cluster
- **Production**: AWS EKS cluster with multi-AZ

### Deployment Process
1. Create PR with changes
2. CI runs tests and builds Docker images
3. Merge to `main` triggers staging deployment
4. Manual approval required for production
5. GitOps (ArgoCD) syncs Kubernetes manifests
6. Canary deployment with gradual traffic shift

## Testing Strategy

- **Unit Tests**: Go testing package
  - Location: `*_test.go` files alongside source
  - Coverage target: 80%
- **Integration Tests**: Testcontainers for dependencies
  - Location: `services/*/tests/integration/`
- **E2E Tests**: Postman collections
  - Location: `tests/e2e/`
- **Load Tests**: k6 scripts
  - Location: `tests/load/`

## Dependencies

### Critical Dependencies
- `google.golang.org/grpc`: gRPC framework
- `github.com/segmentio/kafka-go`: Kafka client
- `github.com/gin-gonic/gin`: HTTP framework
- `gorm.io/gorm`: ORM for PostgreSQL
- `go.uber.org/zap`: Structured logging

### Updating Dependencies
```bash
# Update all dependencies
make update-deps

# Update specific service
cd services/payment-service && go get -u ./...

# Verify no breaking changes
make test
```

## Troubleshooting

### Common Issues

**Service can't connect to Kafka**
- Check Kafka is running: `kubectl get pods -n kafka`
- Verify topic exists: `kubectl exec -it kafka-0 -n kafka -- kafka-topics.sh --list`
- Check service logs: `kubectl logs -f deployment/payment-service`

**gRPC connection refused**
- Verify service is running: `kubectl get pods`
- Check service endpoints: `kubectl get endpoints`
- Test with grpcurl: `grpcurl -plaintext localhost:9090 list`

**Database migration fails**
- Check migration version: `make migrate-version SERVICE=payment-service`
- Review migration logs: `kubectl logs job/payment-service-migration`
- Rollback if needed: `make migrate-down SERVICE=payment-service`

### Debug Mode
```bash
# Enable debug logging for service
kubectl set env deployment/payment-service LOG_LEVEL=debug

# Port-forward for local debugging
kubectl port-forward deployment/payment-service 9090:9090

# Attach debugger (Delve)
dlv attach $(pgrep payment-service)
```

## Additional Resources

- API Documentation: https://api-docs.company.com
- Architecture Diagrams: `docs/architecture/`
- Runbooks: https://runbooks.company.com/payment-platform
- Monitoring: https://grafana.company.com
- Tracing: https://jaeger.company.com
```

## Best Practices

### Keep It Concise
- Focus on what's not obvious from code
- Link to detailed docs rather than duplicating
- Update when architecture changes

### Be Specific
- Include actual commands, not placeholders
- Provide real examples
- Mention specific file paths

### Maintain Regularly
- Update when adding major features
- Review during architecture changes
- Keep technology versions current

### Consider Your Audience
- Write for developers new to the project
- Assume basic technical knowledge
- Explain domain-specific concepts

## Integration with Bob Modes

When you have `agents.md` in your application repository under `repos/`, Bob's custom modes can:

1. **Architecture Review**: Better understand your architecture for more accurate reviews
2. **Security Review**: Identify security patterns and potential vulnerabilities
3. **Scalability Review**: Assess scalability based on your architecture
4. **Documentation Review**: Verify `agents.md` is complete and accurate
5. **SDD Mode**: Use architecture context when creating specifications

## Additional Resources

- [IBM Bob Documentation](https://bob.ibm.com/docs)
- [agents.md Tutorial](https://bob.ibm.com/docs/ide/getting-started/tutorials/start-a-project#explore-agentsmd-files)
- [Architecture Review Mode](../README-ARCHITECTURE-REVIEW.md)
- [Spec-Driven Development](../SDD-README.md)