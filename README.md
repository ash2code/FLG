# FLG

helm commands :
to install helm - fluent bit
helm repo add fluent https://fluent.github.io/helm-charts

helm repo list

to install with custom values
helm install fluent-bit fluent/fluent-bit -f values.yaml --namespace logging

