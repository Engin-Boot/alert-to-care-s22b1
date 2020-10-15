using Xunit;
using RestSharp.Serialization.Json;
using System.Collections.Generic;
using System.Net;

namespace RestSharp
{
    public class UnitTest1
    {
        [Fact]
        public void TestGetBedData()
        {
            var client = new RestClient("https://localhost:44369/");
            var request = new RestRequest("api/BedDatas/B101", Method.GET);

            var response = client.Execute(request);

            var deserialize = new JsonDeserializer();
            var output = deserialize.Deserialize<Dictionary<string, string>>(response);

            var result = output["floor"];
            Assert.True(result == "1");
        }
        [Fact]
        public void TestBedStatus()
        {
            var client = new RestClient("https://localhost:44369/");
            var request = new RestRequest("api/BedDatas/status/B101", Method.GET);

            var response = client.Execute(request);
            var deserialize = new JsonDeserializer();
            var output = deserialize.Deserialize<string>(response);
            string status = "Occupied";
            bool result = status.Equals(output);
            Assert.True(result);
        }

        [Fact]
        public void CheckResponseStatus()
        {
            var client = new RestClient("https://localhost:44369/");
            var request = new RestRequest("api/BedDatas", Method.GET);

            var response = client.Execute(request);

            Assert.True(response.StatusCode == HttpStatusCode.OK);

        }
        [Fact]
        [System.Obsolete]
        public void CheckPostBedData()
        {
            var client = new RestClient("https://localhost:44369/");
            var request = new RestRequest("api/BedDatas/", Method.POST);

            request.RequestFormat = DataFormat.Json;
            request.AddBody(new
            {
                bedID = "B203",
                floor = 3,
                department = "Cardiac",
                occupancyStatus = "Vacant"
            });
            var response = client.Execute(request);
            var deserialize = new JsonDeserializer();
            var output = deserialize.Deserialize<Dictionary<string, string>>(response);
            var result = output["department"];
            Assert.True(result == "Cardiac");
        }

    }
}
