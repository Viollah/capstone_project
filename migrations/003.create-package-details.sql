CREATE TABLE IF NOT EXISTS package_details (
id INTEGER PRIMARY KEY AUTOINCREMENT,
sendername TEXT,
recipientname TEXT,
item TEXT,
fare DECIMAL(10,2),
address_locality TEXT,
city TEXT,
pincode INTEGER,
order_id TEXT,
phonenumber TEXT,
pick_up_address TEXT,
drop_off_address TEXT
);
