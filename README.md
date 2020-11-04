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

Clone the repository and run the following commands sequentially one-by-one:

* yarn install
* yarn server
* yarn storybook

**Note:** NPM and yarn should be installed and configured prior to running the storybook. <br/>

Check the [How to create Unity React App](https://vegaecm2com.sharepoint.com/:b:/g/productmanagement/EeBI9DOi2sdKpWVQ7NGLDo0BX2KKafEMOHRWjDVkwS10JA?e=z1tXAw) document for more details on how to setup NPM. 