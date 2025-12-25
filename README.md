# 🏥 Doctor-Patient Appointment System

A full-stack containerized application for managing medical appointments.

## 🏗 Tech Stack
- **Frontend:** React (TypeScript)
- **Backend:** Django REST Framework (Python 3.12)
- **Database:** PostgreSQL 15
- **Reverse Proxy:** Nginx
- **Containerization:** Docker & Docker Compose

## 🚀 Quick Start

### 1. Start the Application
Use the included helper script to build and start all containers:
```bash
./project.sh start
```

### 2. Initialize Data (First Run Only)
If this is your first time running the app, apply database migrations and create an admin user:
```bash
./project.sh init
```
*(Follow the prompts to create a username and password)*

### 3. Access the App
- **Web App:** [http://localhost:8080](http://localhost:8080)
- **Django Admin:** [http://localhost:8080/admin/](http://localhost:8080/admin/)
- **API Root:** [http://localhost:8080/api/](http://localhost:8080/api/)

## 🛠 Management Commands

| Action | Command |
| :--- | :--- |
| **Start App** | `./project.sh start` |
| **Stop App** | `./project.sh stop` |
| **View Logs** | `./project.sh logs` |
| **Backend Shell** | `./project.sh shell` |

## 🧪 How to Test
1. **Create Data:** Log in to the [Admin Panel](http://localhost:8080/admin/).
   - Create a **User**.
   - Create a **Doctor** linked to that User.
   - Create a **Patient** linked to another User.
2. **Book Appointment:**
   - Go to [localhost:8080](http://localhost:8080).
   - Select your **Patient Identity** from the dropdown.
   - Click **Book Now** on a Doctor card.
   - Select a date and confirm.
3. **View Bookings:**
   - The booking will appear in the "My Appointments" table at the bottom.

## 📂 Project Structure
```
├── backend/          # Django Project
├── frontend/         # React Project
├── nginx/            # Nginx Configuration
├── docker-compose.yml
├── project.sh        # Management Script
└── README.md
```
