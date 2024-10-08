# FLG

helm commands :
to install helm - fluent bit
helm repo add fluent https://fluent.github.io/helm-charts

helm repo list

to install with custom values
helm install fluent-bit fluent/fluent-bit -f values.yaml --namespace logging

Fluent Bit
Port: 2020

Loki
Port: 3100

Grafana
Port: 80 (or 3000 when port-forwarded)

***************************************************************************************

**step 01**: we have to create SCC (security context constraint) 
         we need to allow fluentBit to run as a priveleged container by creating a custom SCC in openshift.
         after creating the SCC , we need to apply it 
        ` oc apply -f fluent-bit-scc.yaml`

**step 02**: Assign the SCC to Fluent Bit.
         We need to assign the newly created SCC (fluent-bit-scc) to the Fluent Bit service account.
         `oc adm policy add-scc-to-user fluent-bit-scc -z fluent-bit -n logging`
         This grants the Fluent Bit pods the necessary privileges to run in OpenShift with access to host paths and log directories.

**step 03**: Install Loki with Helm
         Add the Loki Helm repository : 
         `helm repo add grafana https://grafana.github.io/helm-charts
         helm repo update`

**step 04**: Install Loki.
         `helm install loki grafana/loki-stack --namespace logging --set grafana.enabled=false,prometheus.enabled=false`

**step 05**: Install Fluent Bit with Helm
         `helm install fluent-bit fluent/fluent-bit --namespace logging -f fluent-bit-values-openshift.yaml`

**step 06**: Install Grafana with Helm
         `helm install grafana grafana/grafana --namespace logging`

**step 07**: Verify OpenShift Logging Stack Setup
         Verify that the Fluent Bit pods are running on different worker nodes using:
         `oc get pods -o wide -n logging`
         Log Collection:
         Check that logs from /var/log are being collected by Fluent Bit and sent to Loki.
         Grafana Dashboards:
         query the logs collected by Loki to ensure the complete pipeline works as expected.




