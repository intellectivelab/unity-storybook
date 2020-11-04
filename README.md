# Welcome to Unity React UI storybook

This storybook serves as a source of documentation and live examples on how to use and customize default Unity React components.

## Prerequisites

* You’ll need to have Node >= 8.10 on your local development machine. 
Download and install nodejs - https://nodejs.org/en/download/

* Install yarn:
```npm install -g yarn```

* Setup Intellective NPM repository:   
    1. [Encrypt](https://help.sonatype.com/repomanager3/formats/npm-registry#npmRegistry-AuthenticationUsingBasicAuth) your Intellective credentials in the following format: **intellective_email:password**.
    2. Put encrypted string into your ~/.npmrc file (create if absent)
        ```text
        email=ichukanov@intellective.com 
        always-auth=true 
        _auth=INSERT_ENCRYPTED_PASSWORD_HERE
        ```
        **Note: .npmrc should be in the user home directory.**
    3. Run command, 
        ```sh
        npm set @intellective:registry https://npm.intellective.com/repository/npm-main/
       ```
     
    Check your .npmrc file, it should look like the following:

    ```text
     @intellective:registry=https://npm.intellective.com/repository/npm-main/
     email=!your-id@intellective.com
     always-auth=true
     _auth=[YOUR_ENCRYPTED_CREDENTIALS]
    ```

## Use the storybook

Clone the repository and run `yarn install` in the root folder to install required dependencies.

Start using the storybook by running the following commands:

* yarn server
* yarn storybook

For more information, please refer to:

- [Storybook](https://storybook.js.org) - What storybook is.
- [Getting started](https://storybook.js.org/docs/react/get-started/introduction) - Introduction to Storybook for React.
