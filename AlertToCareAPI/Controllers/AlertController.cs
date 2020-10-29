using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.Mvc;

namespace AlertToCareAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlertController : ControllerBase
    {
        private IHubContext<AlertHub> _hub;

        public AlertController(IHubContext<AlertHub> hub)
        {
            this._hub = hub;
        }
        public IActionResult Get()
        {
           // var alertManager = new AlertManager(() => _hub.Clients.All.SendAsync("transferchartdata", "helloooooooo!!!"));
           // _hub.Clients.All.SendAsync("ReceiveAlerts", "Hello I am alert Controller");
            return Ok(new { Message = "Request Completed" });      
        }
    }
}
