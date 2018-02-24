var chai = require('chai');
var chaiHttp = require('chai-http');
var assert = require('assert');
var Runner = require('./runner');
var orion = require('../index');
var testConfigFactory = require('./testConfigFactory');
var MockConnectionPool = require('../test/mocks/mockConnectionPool');
var mockAzureStorageProvider = require('../test/mocks/mockAzureStorageProvider');
var mockS3StorageProvider = require('../test/mocks/mockS3StorageProvider');
var dataTests = require('../test/tests/data');

var should = chai.should();
chai.use(chaiHttp);
var runner = new Runner(chai, assert);

var mssqlAzureConfig = testConfigFactory.create("mssql", { provider: "azure" });
var mysqlS3Config = testConfigFactory.create("mysql", { provider: "s3" });
var mssqlLocalConfig = testConfigFactory.create("mssql", { provider: "local", uploadPath: "uploads" });
var mysqlLocalConfig = testConfigFactory.create("mysql", { provider: "local", uploadPath: "uploads" });

var mockMssqlConnectionPool = new MockConnectionPool("mssql");
dataTests(orion, chai, runner, "data-mssql", mssqlAzureConfig, mockMssqlConnectionPool);