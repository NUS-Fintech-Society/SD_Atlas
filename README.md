# SD Atlas Guide

Table of Contents

1. [Setting Up](#starting-up)
2. [Technical Documents](#technical-documentation)
3. [Workflow](#workflow)
4. [Tech Stack](#tech-stack)

## Section 1: Setting up <a name="starting-up"></a>

```bash
# Step 1: Clone the repository
$ git clone https://github.com/NUS-Fintech-Society/SD_Atlas.git

# Step 2: Install the recommended modules.
$ yarn install

# Step 3: Place the .env file in the root directory. No commands required

# Step 4: Start the localhost
$ yarn dev
```

## Section 2: Technical Documentation <a name="technical-documentation"></a>

The Entity Relationship Diagram (ERD) is located in the PRD. Please adhere to it. If there are any changes, do
let everyone know so that we are all aligned.

## Section 3: Workflow <a name="workflow"></a>

### Scenario 1: Bug Fixes (Hot Fixes)

Branch out from the **production** branch and fix it and create a PR to the production branch. Reason being is that
this bug deserves immediate fixing and there is no time to test it.

### Scenario 2: New Feature

Branch out from the **dev** branch and work on it. Create a PR to the dev branch when done. Reason being is that we can do testing on the feature to see if there are any issues with it.

## Section 4: Tech Stack Used <a name="tech-stack"></a>

| Tech Stack |                   Uses                   | Relevant Teams |
| :--------: | :--------------------------------------: | :------------: |
| TypeScript |   To allocate a type to the variables    |      All       |
|   NextJS   | A production ready framework for ReactJS |       FE       |
| Next-Auth  |              Authentication              |       FE       |
|  ChakraUI  |                   UIUX                   |       FE       |
|   Prisma   |           ORM for SQL Database           |       BE       |
| Postgresql |                 Database                 |       BE       |
