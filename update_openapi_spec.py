# update_openapi_spec.py
import yaml

def add_media_type_to_request_body(openapi_spec):
    for path, methods in openapi_spec.get('paths', {}).items():
        for method, details in methods.items():
            if 'requestBody' in details:
                if 'content' not in details['requestBody']:
                    details['requestBody']['content'] = {}
                if 'application/json' not in details['requestBody']['content']:
                    details['requestBody']['content']['application/json'] = {
                        'schema': {
                            'type': 'object'
                        }
                    }
    return openapi_spec

def main():
    input_file = 'cmpOpenAi.yaml'  # Path to your OpenAPI spec file
    output_file = 'updated_cmpOpenAi.yaml'

    with open(input_file, 'r') as f:
        openapi_spec = yaml.safe_load(f)

    updated_spec = add_media_type_to_request_body(openapi_spec)

    with open(output_file, 'w') as f:
        yaml.safe_dump(updated_spec, f)

    print(f"Updated OpenAPI specification written to {output_file}")

if __name__ == '__main__':
    main()
