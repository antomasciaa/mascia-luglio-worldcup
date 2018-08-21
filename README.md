### To install all dependecies:

```
npm install
```

### To run the server:

```
node app
```

### Add a new team

POST raw json, example:

```
{"Name": "Francia", "matches": [{"opponent": "Croazia", "outcome": "W" }]}
```

### Add Matches

PUT raw json, example:

```
{"opponent": "Croazia", "outcome": "W" }
```
