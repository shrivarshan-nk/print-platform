# app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.api.routes import auth, users, shops, jobs, payments, campuses
from app.db.session import engine


app = FastAPI(
    title="Campus Print Platform API",
    version="1.0.0"
)

# ---------------------------
# CORS Configuration
# ---------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Next.js local
        "https://your-vercel-domain.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------------------
# Health Check
# ---------------------------

@app.get("/health")
def health_check():
    return {"status": "ok"}


# ---------------------------
# Include API Routes
# ---------------------------

app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
app.include_router(users.router, prefix="/api/users", tags=["Users"])
app.include_router(campuses.router, prefix="/api/campuses", tags=["Campuses"])
app.include_router(shops.router, prefix="/api/shops", tags=["Shops"])
app.include_router(jobs.router, prefix="/api/jobs", tags=["Jobs"])
app.include_router(payments.router, prefix="/api/payments", tags=["Payments"])


# ---------------------------
# Startup Event (Optional DB Check)
# ---------------------------

@app.on_event("startup")
def startup_event():
    try:
        with engine.connect() as connection:
            print("✅ Database connected successfully")
    except Exception as e:
        print("❌ Database connection failed:", e)