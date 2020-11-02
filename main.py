'''
Web System Status
main.py

Remote monitoring tool with web browser GUI and HTTP query mechanism.

2020-10-27

API Endpoints are mapped in /api subdirectory.
/api/system - System-wide statistics
/api + /cpu, /ram, /swap, /disk, /net, /boot - Device-specific status
'''

__author__ = "Giulio Corradini"


import http.server
import argparse
import sys
import json
import stats


def jsonify(func):
    '''
    Decorator. Dumps as a JSON string, the return value from func
    :param func: function to decorate
    :return: callable wrapped function
    '''
    def wrapped_func():
        r = func()
        return json.dumps(r)

    return wrapped_func


class WSSRequestHandler(http.server.SimpleHTTPRequestHandler):
    routes = {
        'system': jsonify(stats.system_wide),
        'cpu': jsonify(stats.cpu),
        'ram': jsonify(stats.ram),
        'disk': jsonify(stats.disk),
        'net': jsonify(stats.net),
        'boot': jsonify(stats.boot),
    }


    def do_GET(self):

        path = self.path.split(sep='/') # returns ['', 'dir_1'... ]
        if path[1] == 'api':
            try:
                api_endpoint = path[2]
                action = self.routes.get(api_endpoint)

                if not action:
                    self.send_response(400)
                    self.end_headers()
                    self.wfile.write(b'Invalid endpoint')
                    return

                response = action()

                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(response.encode())

            except IndexError:
                self.send_response(400)
                self.end_headers()
                self.wfile.write(b'Endpoint required')

        else:
            super().do_GET()


def main(host, port):
    with http.server.HTTPServer((host, port), WSSRequestHandler) as server:
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            print("Exiting")


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument("--host", metavar="host", type=str, default='localhost', required=False)
    parser.add_argument("--port", metavar="port", type=int, default=9999, required=False)

    args = parser.parse_args(sys.argv[1:])

    main(args.host, args.port)