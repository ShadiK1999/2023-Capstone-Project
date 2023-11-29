#!/bin/sh
rootPw=$(cat /run/secrets/db_root_password)

if ! mysql --user=root --password="$rootPw" -e "SELECT 1";
then
    exit 1;
fi