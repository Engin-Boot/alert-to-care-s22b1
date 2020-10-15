using System;
using System.Collections.Generic;
using System.Text;
using Xunit;
using RestSharp;
using System.Net;
using RestSharp.Serialization.Json;

namespace RestSharp
{
    public class PatientMonitorTest
    {
        [Fact]
        public void GetResponseStaus()
        {
            var client = new RestClient("https://localhost:44369/");
            var request = new RestRequest("api/PatientMonitor", Method.GET);

            var response = client.Execute(request);

            Assert.True(response.StatusCode == HttpStatusCode.OK);
        }

        [Fact]
        public void GetMonitorAlertTest()
        {
            var client = new RestClient("https://localhost:44369/");
            var request = new RestRequest("api/PatientMonitor/MONITOR/P1", Method.GET);
            var response = client.Execute(request);
            var deserialize = new JsonDeserializer();
            var output = deserialize.Deserialize<string>(response);
            var temp = "SPo2 is unstable Or BPM is unstable";
            bool result = output.Equals(temp);
            Assert.True(result);
        }

        [Fact]
        public void FalseGetMonitorAlertTest()
        {
            var client = new RestClient("https://localhost:44369/");
            var request = new RestRequest("api/PatientMonitor/MONITOR/P1", Method.GET);
            var response = client.Execute(request);
            var deserialize = new JsonDeserializer();
            var output = deserialize.Deserialize<string>(response);
            var temp = "SPo2 is unstable Or BPM is stable";
            bool result = output.Equals(temp);
            Assert.False(result);
        }

    }
}
