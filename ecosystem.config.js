module.exports = {
    "apps" : [
      {
        "name"            : "prod-inventory",
        "script"          : "../index.js",
        "instances"       : "max",
        "exec_mode"       : "cluster", 
        "log_date_format" : "YYYY-MM-DD HH:mm Z",
        "env"  : {
            "PORT": 5000
        }
      }
    ]
  }