# API

## 1. Get all exchanges by date

- Request:
  - *Method*: GET
  - *Path*: /api/exchange/date
  - *Body*: application/x-www-form-urlencoded

| Field | Type   | Require     | Note                             |
| ----- | ------ | ----------- | -------------------------------- |
| date  | String | **Require** | Ngày ở định dạng ISO: YYYY-MM-DD |

## 2. Get exchanges history in a period

- Request:
  - *Method*: GET
  - *Path*: /api/exchange/history
  - *Body*: application/x-www-form-urlencoded

| Field     | Type   | Require     | Note                                      |
| --------- | ------ | ----------- | ----------------------------------------- |
| startDate | String | **Require** | Ngày bắt đầu ở định dạng ISO: YYYY-MM-DD  |
| endDate   | String | **Require** | Ngày kết thúc ở định dạng ISO: YYYY-MM-DD |






