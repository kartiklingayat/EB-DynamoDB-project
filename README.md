# EB-DynamoDB-project
Repository Structure
EB-DynamoDB-Project/
│
├─ app.js                # Node.js backend server handling form submissions
├─ package.json          # Node.js dependencies and scripts
├─ package-lock.json     # Locked dependencies versions
├─ public/               # Static files (HTML, CSS, JS)
│   ├─ index.html        # Web form page
│   └─ style.css         # CSS for styling the form
├─ .gitignore            # Files/folders to ignore in Git
├─ README.md             # Project overview and instructions
└─ .ebextensions/        # (Optional) EB environment configurations

README.md Content
# EB-DynamoDB-Project

## Project Overview
This project is a cloud-hosted web application for **collecting user data through a web form** and storing it securely in **AWS DynamoDB**. The website is hosted on **AWS Elastic Beanstalk**, providing scalability, load balancing, and easy deployment. GitHub is used for **version control**.

## Features
- User-friendly web form to collect:
  - Full Name
  - Email Address
  - Phone Number
  - Category
  - Message
- Data is securely stored in AWS DynamoDB (serverless NoSQL database)
- Hosted on AWS Elastic Beanstalk with automatic scaling
- GitHub repository for code version control and collaboration

## Architecture
1. Frontend: HTML/CSS web form
2. Backend: Node.js + Express server
3. Database: AWS DynamoDB
4. Hosting: AWS Elastic Beanstalk
5. Version Control: GitHub

**Data Flow:**


User → Web Form → Node.js Backend → DynamoDB
↑
GitHub (code repository)
↑
Elastic Beanstalk Deployment


## Setup & Deployment Instructions

### Prerequisites
- Node.js installed
- AWS account with Elastic Beanstalk & DynamoDB access
- AWS CLI installed and configured
- Git installed

### Steps
1. **Clone the repository**
```bash
git clone https://github.com/your-username/EB-DynamoDB-Project.git
cd EB-DynamoDB-Project


Install Dependencies

npm install


Configure AWS Credentials

aws configure


Enter AWS Access Key ID, Secret Access Key, region (us-east-1), output format (json)

Deploy to Elastic Beanstalk

eb init -p node.js EB-DynamoDB-Project --region us-east-1
eb create my-static-env
eb deploy


Open your website

eb open

DynamoDB Setup

Create a table UserData with primary key id (String)

Backend (app.js) writes form submissions to this table using AWS SDK.

Benefits

Fully managed, serverless architecture

Scalable and reliable hosting via Elastic Beanstalk

Secure data storage in DynamoDB

Continuous deployment from GitHub

HTTPS supported for secure form submissions

License

MIT License


---

## **.gitignore Example**


node_modules/
.env
.DS_Store
*.log


---

### ✅ Notes for GitHub
- Make sure **all code files** (app.js, public folder, package.json) are committed.
- **Push to GitHub**:
```bash
git add .
git commit -m "Initial commit - Add web form, backend, and DynamoDB integration"
git push origin main
