#!/usr/bin/env python

import sys
def run_quickstart(imageName):
    # [START vision_quickstart]
    import io
    import os

    # Imports the Google Cloud client library
    from google.cloud import vision
    from google.cloud.vision import types

    client = vision.ImageAnnotatorClient()

    # The name of the image file to annotate
    file_name = os.path.abspath(imageName)

    # Loads the image into memory
    with io.open(file_name, 'rb') as image_file:
        content = image_file.read()

    image = types.Image(content=content)

    # Performs label detection on the image file
    response = client.label_detection(image=image)
    labels = response.label_annotations
    returnLabels = []
    for label in labels:
        returnLabels.append(label.description)
    return returnLabels


if __name__ == '__main__':
    run_quickstart(sys.argv[1])
