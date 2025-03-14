CREATE TABLE IF NOT EXISTS iot_lorawan (
    id SERIAL PRIMARY KEY,
    dev_address VARCHAR(255) NOT NULL,
    dev_model VARCHAR(255) NOT NULL,
    machine VARCHAR(255) NOT NULL,
    val_workcenter VARCHAR(255) NOT NULL,
    input_name VARCHAR(255) NOT NULL,
    input_category VARCHAR(255) NOT NULL,
    input_value VARCHAR(255) NOT NULL,
    input_generic VARCHAR(255),
    record_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )

CREATE TABLE IF NOT EXISTS lorawan_consolidation (
    id SERIAL PRIMARY KEY,
    dev_address VARCHAR(255) NOT NULL,
    dev_model VARCHAR(255) NOT NULL,
    machine VARCHAR(255) NOT NULL,
    val_workcenter VARCHAR(255) NOT NULL,
    input_name VARCHAR(255) NOT NULL,
    input_category VARCHAR(255) NOT NULL,
    input_value VARCHAR(255) NOT NULL,  
    dtt_start TIMESTAMP NOT NULL,
    dtt_duration DECIMAL NOT NULL,
    record_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )