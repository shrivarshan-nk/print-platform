# app/core/config.py

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str
    SUPABASE_URL: str | None = None
    SUPABASE_ANON_KEY: str | None = None

    class Config:
        env_file = ".env"


settings = Settings()# -*- coding: utf-8 -*-

