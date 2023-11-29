import subprocess
import os
import csv
import shutil
from typing import List

def fail(reason: str, exitcode: int = 1):
    print("[FAIL] " + reason)
    exit(exitcode)

def info(msg: str):
    print("[INFO] " + msg)

def blank():
    print("")

base_dir = os.path.dirname(os.path.realpath(__file__))
target_dir = os.path.join(base_dir, "target")

if os.path.exists(target_dir):
    shutil.rmtree(target_dir)
    info("Existing target directory cleaned.")
    blank()

info("Running API and JMeter through Docker Compose...")

process = subprocess.run("docker compose run jmeter", cwd=base_dir)

if process.returncode != 0:
    fail("Error occurred in Docker execution.")

info("Docker Compose run of API and JMeter complete.")
blank()
info("Destroying Docker containers...")

subprocess.run("docker compose down", cwd=base_dir)

info("Docker containers destroyed.")
blank()
info("Reading JMeter output...")

output_path = os.path.join(target_dir, "output.log")
if not os.path.exists(output_path):
    fail("JMeter log was not found at target/output.log.")

failed: List[str] = []

with open(output_path) as output_csv:
    output = csv.DictReader(output_csv)
    for sample in output:
        if sample["success"] != "true":
            failed.append(
                f"{sample['timeStamp']} {sample['label']} ({sample['responseCode']} {sample['responseMessage']})\n\t{sample['failureMessage']}"
            )

info("JMeter output read successfully.")
blank()

if len(failed) > 0:
    for test in failed:
        print(test)
    blank()
    fail(f"{len(failed)} samples failed.")

info("All samples passed!")
