#!/bin/bash

# Helper script for Doctor Appointment System

case "$1" in
  start)
    echo "🚀 Starting application..."
    docker compose up --build -d
    echo "✅ App is running at http://localhost:8080"
    ;;
    
  stop)
    echo "🛑 Stopping application..."
    docker compose down
    ;;

  logs)
    echo "📜 Showing logs (Ctrl+C to exit)..."
    docker compose logs -f
    ;;

  init)
    echo "🛠 Running database migrations..."
    docker compose exec backend python manage.py migrate
    echo "👤 Create your Admin/Doctor user:"
    docker compose exec -it backend python manage.py createsuperuser
    ;;

  shell)
    echo "💻 Entering Backend Shell..."
    docker compose exec -it backend /bin/bash
    ;;

  *)
    echo "Usage: ./project.sh {start|stop|logs|init|shell}"
    exit 1
    ;;
esac
