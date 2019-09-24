#!/bin/bash
#
# SPDX-License-Identifier: Apache-2.0

function _exit(){
    printf "Exiting:%s\n" "$1"
    exit -1
}

# Where am I?
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"
echo ${DIR}
cd "${DIR}/organization/xpanxion/configuration/cli"
docker-compose -f docker-compose.yml up -d cliXpanxionCorp

echo "
 Install and Instantiate a Smart Contract in either langauge

 JavaScript Contract:

 docker exec cliXpanxionCorp peer chaincode install -n employeebddetailscontract -v 0 -p /opt/gopath/src/github.com/contract -l node
 docker exec cliXpanxionCorp peer chaincode instantiate -n employeebddetailscontract -v 0 -l node -c '{\"Args\":[\"org.hrnet.employeeBgInfolist:instantiate\"]}' -C mychannel -P \"AND ('Org1MSP.member')\"




 Run Applications in either langauage (can be different from the Smart Contract)

 JavaScript Client Aplications:

 To add identity to the wallet:   node addToWallet.js
 To issue the paper           :   node issue.js

 Java Client Applications:

 (remember to build the Java first with 'mvn')

 To add identity to the wallet:   java addToWallet
 To issue the paper           :   java issue
"

echo "Suggest that you change to this dir>  cd ${DIR}/organization/magnetocorp/"
