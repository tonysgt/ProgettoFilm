using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Text;
using System.Net.Http.Headers;

namespace SuperCoolApp.Controllers
{
    [Route("api/")]
    public class PassThroughApiController : Controller
    {
        private const string baseAddress = "http://localhost:5000/api/";
        static HttpClient http = new HttpClient(new HttpClientHandler { UseCookies = false, });

        /// <summary>
        /// Gets the specified URL.
        /// </summary>
        /// <returns></returns>
        [HttpGet("{*any}")]
        public Task<IActionResult> Get()
        {
            return SendAsync(HttpMethod.Get);
        }

        /// <summary>
        /// Posts the specified URL.
        /// </summary>
        /// <returns></returns>
        [HttpPost("{*any}")]
        public Task<IActionResult> Post()
        {
            return SendAsync(HttpMethod.Post);
        }

        /// <summary>
        /// Puts the specified URL.
        /// </summary>
        /// <returns></returns>
        [HttpPut("{*any}")]
        public Task<IActionResult> Put()
        {
            return SendAsync(HttpMethod.Put);
        }

        /// <summary>
        /// Deletes the specified URL.
        /// </summary>
        /// <returns></returns>
        [HttpDelete("{*any}")]
        public Task<IActionResult> Delete()
        {
            return SendAsync(HttpMethod.Delete);
        }

        private async Task<IActionResult> SendAsync(HttpMethod method)
        {

            Console.WriteLine(method);
            //Console.WriteLine(Request.Headers);
            //Console.WriteLine("Messaggi vari fuori try");
            //foreach (var header in Request.Headers)
            //{
            //    Console.WriteLine(header);
            //}
            
            try
            {
                //var serviceApiUri = new Uri(baseAddress);

                string path = Request.Path.Value.Replace("/api/", "");
                string pathAndQuery = path + Request.QueryString;
              
                var uri = new Uri(baseAddress+pathAndQuery);
                foreach (var header in Request.Headers)
                {
                    Console.WriteLine(header);
                }
                    HttpRequestMessage request = new HttpRequestMessage(method, uri);
                if (method == HttpMethod.Put || method == HttpMethod.Post)
                {
                    using (Stream receiveStream = Request.Body)
                    {
                        string documentContents;
                        using (StreamReader readStream = new StreamReader(receiveStream, Encoding.UTF8))
                        {
                            documentContents = readStream.ReadToEnd();
                        }
                        Console.WriteLine(documentContents);
                        request.Content = new StringContent(documentContents);
                    }
                }
                //copy original headers
                Console.WriteLine("Sto copiando gli headers");
                Console.WriteLine(Request.Headers.Keys.ToArray());

                foreach (var header in Request.Headers)
                {
                    //request.Headers.Add(header.Key, header.Value.ToArray());
                    Console.WriteLine(header);
                    //request.Headers.TryAddWithoutValidation(header.Key, header.Value.ToArray());
                    if (header.Key != "Content-Type" && header.Key != "Content-Length")
                    {
                        request.Headers.Add(header.Key, header.Value.ToArray());
                    }

                    else
                    {
                        if(header.Key == "Content-Type")
                          request.Content.Headers.ContentType = new MediaTypeHeaderValue(header.Value);
                        if (header.Key == "Content-Length")
                            request.Content.Headers.Add(header.Key, header.Value.ToArray());
                    }


                }

                var httpResponse = await http.SendAsync(request);
                if(httpResponse.IsSuccessStatusCode)
                {
                    var responseData = await httpResponse.Content.ReadAsStringAsync();
                    return Ok(Newtonsoft.Json.JsonConvert.DeserializeObject(responseData));
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, httpResponse.ReasonPhrase);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }
    }
}
