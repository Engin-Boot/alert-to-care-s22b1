using System.Collections.Generic;
using System.Net;
using RestSharp.Serialization.Json;
using Xunit;
namespace RestSharp
{
    public class UnitTest2
    {
        [Fact]
        public void TestGetPatient()
        {
            var client = new RestClient("https://localhost:44369/");
            var request = new RestRequest("api/PatientData/P1", Method.GET);

            var response = client.Execute(request);

            var deserialize = new JsonDeserializer();
            var output = deserialize.Deserialize<Dictionary<string, string>>(response);

            var result = output["mobileNo"];
            Assert.True(result == "9174661167");
        }

        [Fact]
        public void CheckResponseStatus()
        {
            var client = new RestClient("https://localhost:44369/");
            var request = new RestRequest("api/PatientData", Method.GET);

            var response = client.Execute(request);

            Assert.True(response.StatusCode == HttpStatusCode.OK);

        }

        [Fact]
        [System.Obsolete]
        public void CheckPostPatientData()
        {
            var client = new RestClient("https://localhost:44369/");
            var request = new RestRequest("api/PatientData/", Method.POST);

            request.RequestFormat = DataFormat.Json;
            request.AddBody(new
            {
                patientID = "P4",
                name = "Ankit",
                dateOfBirth = "16/07/89",
                mobileNo = "783472545",
                bedID = "B106",
                spo2 = "unstable",
                bpm = "stable"
            });
            var response = client.Execute(request);
            var deserialize = new JsonDeserializer();
            var output = deserialize.Deserialize<Dictionary<string, string>>(response);
            var result = output["name"];
            Assert.True(result == "Ankit");
        }

        [Fact]
        public void CheckForDischargePatient()
        {
            var client = new RestClient("https://localhost:44369/");
            var request = new RestRequest("api/PatientData/P4", Method.DELETE);
            var response = client.Execute(request);
            var deserialize = new JsonDeserializer();
            var output = deserialize.Deserialize<Dictionary<string, string>>(response);
            var result = output["name"];
            Assert.True(result == "Ankit");
        }

    }
}