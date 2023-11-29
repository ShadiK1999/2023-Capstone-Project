#!/bin/sh
rootPw=$(cat /run/secrets/db_root_password)
apiPw=$(cat /run/secrets/db_api_password)
createUser="CREATE USER 'api' IDENTIFIED WITH caching_sha2_password BY '$apiPw'"
grantPermissions="GRANT SELECT, INSERT, UPDATE, DELETE on trustedneighbour.* to 'api';"

mysql --user=root --password="$rootPw" -e "$createUser; $grantPermissions"