# Vantage EO Microservices Setup

This workspace now contains a frontend app plus four backend services:

- Auth service: Vantage-auth-service-main
- Event service: Vantage-EO-Event-Service/Vantage-EO-Event-Service
- Ticket service: Vantage-ticket-service
- Analytics service: Vantage-analytics-service

## Service responsibilities

- Auth service: login, logout, user profile, token handling
- Event service: event CRUD and event metadata
- Ticket service: ticket creation, updates, and status tracking
- Analytics service: event view and conversion metrics

## Initial API endpoints

### Ticket service

- GET /api/tickets
- POST /api/tickets
- GET /api/tickets/{id}
- PUT /api/tickets/{id}
- DELETE /api/tickets/{id}

### Analytics service

- GET /api/analytics
- POST /api/analytics
- GET /api/analytics/{id}
- PUT /api/analytics/{id}
- DELETE /api/analytics/{id}

## Next steps

1. Add authentication between services with Sanctum or JWT.
2. Connect the frontend join form to the ticket service.
3. Send analytics events from the event detail page.
4. Add Docker Compose and service discovery for local orchestration.
