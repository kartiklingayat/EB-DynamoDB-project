// app.js
const express = require('express');
const bodyParser = require('body-parser');
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand, ScanCommand, DeleteCommand } = require("@aws-sdk/lib-dynamodb");

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

// AWS SDK v3 client
const REGION = "us-east-1";
const client = new DynamoDBClient({ region: REGION });
const ddbDocClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = "UserData";

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
// Store form data
app.post('/submit', async (req, res) => {
    const { name, email, phone, message, category } = req.body;
    
    const params = {
        TableName: TABLE_NAME,
        Item: {
            id: Date.now().toString(),
            name: name,
            email: email,
            phone: phone || '',
            message: message || '',
            category: category || 'General',
            createdAt: new Date().toISOString(),
            status: 'Active'
        }
    };

    try {
        await ddbDocClient.send(new PutCommand(params));
        res.json({ 
            success: true, 
            message: 'Data saved successfully!',
            data: params.Item
        });
    } catch (err) {
        console.error("Error saving data:", err);
        res.status(500).json({ 
            success: false, 
            message: 'Error saving data.' 
        });
    }
});

// Get all data
app.get('/data', async (req, res) => {
    try {
        const params = {
            TableName: TABLE_NAME
        };
        const data = await ddbDocClient.send(new ScanCommand(params));
        res.json({
            success: true,
            data: data.Items || []
        });
    } catch (err) {
        console.error("Error fetching data:", err);
        res.status(500).json({
            success: false,
            message: 'Error fetching data.'
        });
    }
});

// Delete data
app.delete('/data/:id', async (req, res) => {
    try {
        const params = {
            TableName: TABLE_NAME,
            Key: {
                id: req.params.id
            }
        };
        await ddbDocClient.send(new DeleteCommand(params));
        res.json({
            success: true,
            message: 'Data deleted successfully!'
        });
    } catch (err) {
        console.error("Error deleting data:", err);
        res.status(500).json({
            success: false,
            message: 'Error deleting data.'
        });
    }
});

// Health check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        service: 'DynamoDB Form API'
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));