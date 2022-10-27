# altschool-exam-project

## Introduction

This spells out project guidelines to ease project on-boarding and setup.

Available features include:

- Authentication
- Blogs

#### Setup

1. git clone the project from the master branch
2. create a new branch from the master branch
4. create a .env file mirroring values from the .example.env file in the root directory of the project
5. then run the below command in the root directory of the project.

```bash
npm install && npm run dev
```

#### Tests
 
Working with jest and supertest for the test suite, to view the test reports run the following commands below in the root directory of the project.

```bash
npm install mongodb-memory-server
```

Note that this will take some time and should be installed under dev-dependencies or globally. Then run the below command

```bash
npm test
```



#### ```Note```

1. Eslint is been used to enforce code styling and formatting for standardisation purposes 
2. Please refer to the following resources to clear any confusions and to configure lint-on-save with vs-code


1. [Eslint configuration](https://dev.to/drsimplegraffiti/eslint-configuration-for-node-project-275l)
2. [Linting on save](https://www.digitalocean.com/community/tutorials/workflow-auto-eslinting)


#### Usage

[Documentation]()

**1**. **Authentication**

  * Register  
  * Login

**2**. **Blogs**

  * Create blog
  * Get all blogs(author)
  * publish blog
  * Update blog
  * delete job
  * Get blog(public)
  * Get all blogs(public)
