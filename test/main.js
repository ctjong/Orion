(function(){
    var Runner = require('./runner');

    /** 
     * Test entry point
     */
    function main()
    {
        // initialize configs
        var testConfigFactory = require('./testConfigFactory');
        var mssqlAzureConfig = testConfigFactory.create("mssql", { provider: "azure" });
        var mysqlS3Config = testConfigFactory.create("mysql", { provider: "s3" });
        var mssqlLocalConfig = testConfigFactory.create("mssql", { provider: "local", uploadPath: "uploads" });
        var mysqlLocalConfig = testConfigFactory.create("mysql", { provider: "local", uploadPath: "uploads" });
    
        // run tests
        startTestSession(mssqlAzureConfig, "mssql", null, "data-mssql");
        startTestSession(mysqlS3Config, "mysql", null, "data-mysql");
    }

    /**
     * 
     * @param {*} config 
     * @param {*} engine 
     * @param {*} storageProviderName 
     * @param {*} sessionName 
     */
    function startTestSession(config, engine, storageProviderName, sessionName)
    {
        var runner = new Runner(config, engine, storageProviderName);

        before(function(done)
        {
            if(!runner.isServerStarted)
                runner.startServer(done);
        });

        describe(sessionName, function()
        {
            var params = 
            {
                // { id: "1", domain: "local", domainId: null, roles: "member" }
                user1Token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJkb21haW4iOiJsb2NhbCIsImRvbWFpbklkIjpudWxsLCJyb2xlcyI6Im1lbWJlciIsImlhdCI6MTUxOTQ1OTYyOH0.MWjNP36TRnrBTmtDQqLN3tWRn06eASEu7Z4_7ocYrcU",
                // { id: "2", domain: "local", domainId: null, roles: "member" }
                user2Token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJkb21haW4iOiJsb2NhbCIsImRvbWFpbklkIjpudWxsLCJyb2xlcyI6Im1lbWJlciIsImlhdCI6MTUxOTQ1OTYxNH0.MnZ6M-ebkIvomy-Ls1ICgYctQecO9xwqA1ggiqI5b2k",
                // { id: "3", domain: "local", domainId: null, roles: "member" }
                user3Token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMiLCJkb21haW4iOiJsb2NhbCIsImRvbWFpbklkIjpudWxsLCJyb2xlcyI6Im1lbWJlciIsImlhdCI6MTUxOTQ1OTU5MX0.1-sM6LWj3m51LAi_c3QRaCSooIo21NiWv0POw-wrHDg",
                // testpassword
                hashedPassword: "3a6ad575db2b6a2a170f26505dff23a2b0ec337b34c011269ccd4e024e25847eea9e5023e58dd4084c94dea5127ab4e3f7c2122a2ef208c81e6035de37ccfec8"
            };

            require("./tests/tests-errors")(runner, params);
            require("./tests/tests-user")(runner, params);
            require("./tests/tests-item")(runner, params);
            require("./tests/tests-message")(runner, params);
        });
    }

    main();
})();