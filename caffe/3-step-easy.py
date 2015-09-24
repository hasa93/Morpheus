
from batcountry import BatCountry
import numpy as np
from PIL import Image
import argparse 
import time

ap = argparse.ArgumentParser()

ap.add_argument("-b", "--base-model", required=True, help="base model path")
ap.add_argument("-l", "--layer", type=str, default="conv2/3x3", help="layer of CNN to use")
ap.add_argument("-i", "--image", required=True, help="image path")
ap.add_argument("-o", "--output", required=True, help="image out")

args = ap.parse_args()

start = time.time()

bc = BatCountry(args.base_model)
image = bc.dream(np.float32(Image.open(args.image)), end=args.layer)

print time.time() - start

result = Image.fromarray(np.uint8(image))
result.save(args.output)

bc.cleanup()
