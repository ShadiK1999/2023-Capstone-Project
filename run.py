from typing import List
import subprocess
from argparse import ArgumentParser
from enum import Enum

DOCKER_COMPOSE: List[str] = ["docker", "compose"]

class Colors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

class BuildMode(Enum):
    DEV = 1
    PROD = 2

STR_TO_BUILD_MODE = {
    "dev": BuildMode.DEV,
    "prod": BuildMode.PROD
}

BUILD_MODE_TO_STR = {
    BuildMode.DEV: "dev",
    BuildMode.PROD: "prod"
}

BUILD_MODE_PORT = {
    BuildMode.DEV: 5000,
    BuildMode.PROD: 80
}

def log(text: str):
    print(f"{Colors.HEADER}|||| {text}{Colors.ENDC}")

def log_table_text(text: str, length: int):
    log(f"| {text.center(length)} |")

def log_table_separator(length: int):
    log(f"+-{'-'*length}-+")

def get_build_mode_args(mode: BuildMode) -> List[str]:
    if mode == BuildMode.PROD:
        return ["-f", "docker-compose.yml", "-f", "docker-compose.prod.yml"]
    else:
        return []

def run_docker(heading: str, cmd: List[str]):
    log(heading)
    result = subprocess.run(cmd)
    result.check_returncode()

def build(mode: BuildMode):
    run_docker(
        f"[{BUILD_MODE_TO_STR[mode]}] Building images...",
        DOCKER_COMPOSE + get_build_mode_args(mode) + ["build"]
    )

def up(mode: BuildMode, attach: bool):
    run_docker(
        f"[{BUILD_MODE_TO_STR[mode]}] Starting{' and attaching to' if attach else ''} containers...",
        DOCKER_COMPOSE + get_build_mode_args(mode) + ["up", "--force-recreate"] + ([] if attach else ["-d"])
    )

def down(remove_volumes: bool):
    run_docker(
        f"Destroying containers{' and volumes' if remove_volumes else ''}...",
        DOCKER_COMPOSE + ["down"]
    )

parser = ArgumentParser()
parser.add_argument("-a", "--attach", action="store_true", help="attach to the container processes and display logs")
parser.add_argument("-s", "--stop", action="store_true", help="stop the running application instead of starting it")
parser.add_argument("-m", "--mode", choices=["dev", "prod"], default="dev", help="the mode to run the application in")
parser.add_argument("-v", "--remove-volumes", action="store_true", help="remove volumes as part of the stopping process")
args = parser.parse_args()

log_table_separator(50)
log_table_text("Alternative Delivery Point Registration Platform", 50)
log_table_separator(50)
log_table_text("Developed as part of Industry Project 55", 50)
log_table_text("at Swinburne University in 2023:", 50)
log_table_text(" "*50, 50)
log_table_text("Trusted Neighbour as a Solution for Alternate", 50)
log_table_text("Delivery Point in Last Mile Logistics", 50)
log_table_separator(50)
log_table_text("Developed by", 50)
log_table_text("       Elliot Hillary      Shadi Kais".ljust(50), 50)
log_table_text("       Martin Vu           Harris Ebdon".ljust(50), 50)
log_table_text("       Ben Seaton          Nakshtra Yadav".ljust(50), 50)
log_table_separator(50)

print()

if args.stop:
    down(args.remove_volumes)
    print(f"{Colors.OKGREEN}Application stopped successfully.")
else:
    build_mode = STR_TO_BUILD_MODE[args.mode]
    build(build_mode)

    if args.attach:
        try:
            up(build_mode, True)
        except KeyboardInterrupt:
            pass
        print(f"{Colors.OKGREEN}Application ran successfully.")
    else:
        up(build_mode, False)
        print(f"{Colors.OKGREEN}Application running on port {BUILD_MODE_PORT[build_mode]} (http://localhost:{BUILD_MODE_PORT[build_mode]}){Colors.ENDC}")