@echo off
title He thong Automation Scraper - Hieu Backend
color 0A

:: 1. KHOI DONG BACKEND SPRING BOOT
echo [1/2] Dang khoi dong Backend Spring Boot...
start "Spring Boot Backend" cmd /k "cd ../be && mvn spring-boot:run"

:: 2. CHO 5 GIAY DE BACKEND ON DINH
timeout /t 5 /nobreak > nul

:: 3. KHOI DONG FRONTEND / NPM START
echo [2/2] Dang khoi dong NPM Start...
start "NPM Frontend" cmd /k "cd ../fe && npm run dev"

echo -----------------------------------------------------
echo [DONE] Ca 2 he thong dang duoc khoi dong trong cua so moi.
echo -----------------------------------------------------
pause