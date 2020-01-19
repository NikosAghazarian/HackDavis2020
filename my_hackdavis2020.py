
# MSW stands for municipal solid waste
# Takes in key words form the google api (identified from the picture)
# Matches the key words to proper output
# Output for each keyword is its impact, how to properly dispose of it, what alternatives there are

import sys
import json


# input: string api key word to ID which kind of MSW
# output: returns a int (will correspond to type of MSW)
# source: from epa.gov (https://www.epa.gov/facts-and-figures-about-materials-waste-and-recycling/national-overview-facts-and-figures-materials)
def get_input(MSW_str, output_dict):

    msw_dict = {

    #type:
    # percent of world material trash
    # how to dispose of said type
    # additional fact/did you know OR alternatives

    "Paper Cardboard": [
        .25,
        "Paper and cardboard NOT contaminated with food or oil should be RECYCLED (blue). Paper and cardboard contaminated with food, paper towels, and paper napkins should be flattend and placed in COMPOST (green).",
        "However, paper plates and paper cups are should go to LANDFILL (black) unless certified to be composted! DID YOU KNOW: Paper makes up approximately 38% of the U.S. solid waste? You can help decrease this amount by reducing your paper usage!"],
    "Glass": [
        .042,
        "Glass containers for food and drinks are 100% RECYCLABLE (blue)!",
        "DID YOU KNOW: Recycling glass creates around 8 jobs, reduces carbon dioxide, and can recycled without purity or quality loss? It reduces emissions, consumptions of raw materials, and saves energy!"],
    "Metals": [
        .094,
        "Aluminum should be RECYCLED (blue), but please make sure you empty them first! Aluminum foil should be reused as much as possible before going to LANDFILL (black).",
        "DID YOU KNOW: Aluminum cans can be recycled without loss of quality? Try to use aluminum cans as much as possible as opposed to plastic bottles!"],
    "Plastics": [
        .132,
        "Plastic bottles should be RECYCLED (blue) after being emptied! Plastic bags, wraps, cups, dishware, straws, food-related paper, and anything that has been contaiminated with food and food oils should be placed in LANDFILL (black)!",
        "DID YOU KNOW: Not all paper products can be recycled; When in doubt, throw it out! When possible, its much better to use other reusable items (eg. Using a resuable bag instead of plastic bags)!"],
    "Yard Trimmings": [
        .131,
        "Please COMPOST (green) your lawn trimmings, whether you compost it yourself or use a curbside pickup option!",
        "Please remember lawn trimmings consist of grass clippings, leaves, garden material, and branches, all of which are compostable. Dirt, rocks, concrete, lumber, and construction waste are NOT lawn trimmings!"],
    "Food": [
        .152,
        "Not all food can be composted! Vegetables, flour based food, coffee groups, tea bags, grains, egg shells, and other oragnic food wastes should be COMPOSTED. Food waste with oils and fats (meat, dairy, pure oils, etc) should be thrown away in your kitchen disposal OR LANDFILL (black).",
        "DID YOU KNOW: If the U.S. composted the 21 million tons of food waste that goes to landfill every year, it would cut the same amount greenhouse gas emissions as takimg two million cars off the road!"],
    "Wood": [
        .067,
        "Only wood that has not been contaminated (painted, stained, treated, etc) can be RECYCLED (blue)! Otherwise, it goes in LANDFILL (black).",
        "if possible, please reuse the wood you have; DIY projects help save resources!"],
    "Rubber Leather": [
        .034,
        "Rubber should be RECYCLED (blue) and leather, if not reusable or repurposeable, should be COMPOSTED (green)!",
        "DID YOU KNOW: It takes years for rubber to decompose and when burned, releases harmful gases, polluting the air? Please recycle your rubber!"],
    "Textiles Cloth Clothing Clothes": [
        .063,
        "If you must dispose your textiles, please RECYCLE (blue) them.",
        "However, it is best if you can reuse them (eg. as rags) or recycle them through donation!"]
    }
    for key in msw_dict:
        if MSW_str == key or MSW_str in key:
            if key not in output_dict:
                output_dict[key] = {
                'numeric data': msw_dict[key][0],
                'processing': msw_dict[key][1],
                'additions': msw_dict[key][2]
                }


    return output_dict



# input: get int that will correspond to type of MSW
# output: a json file with the appropriate text output (impact, compost, alternatives)
# def get_type(MSW_int):



# input: string api key word to ID which kind of MSW
# output: json file with the appropriate text (impact, compost, alternatives) to be displayed
def main(input_list):
    split_input = []
    for input_item in input_list:
        temp = input_item.split()
        split_input = ''.join(temp)
    output_dict = {}
    for string_input in split_input:
        output_dict = get_input(string_input, output_dict)
    output_dict["sources"] = {
    'All': "https://www.epa.gov/facts-and-figures-about-materials-waste-and-recycling/national-overview-facts-and-figures-materials",
    'Paper and Cardboard': 'https://lbre.stanford.edu/pssistanford-recycling/frequently-asked-questions/frequently-asked-questions-paper',
    'Glass': "http://www.gpi.org/recycling/glass-recycling-facts",
    'Metals': "https://www.goingzerowaste.com/blog/how-to-recycle-correctly",
    'Plastics': "https://www.recycleacrossamerica.org/tips-to-recycle-right",
    'Yard Trimmings': "https://www.sandiegocounty.gov/content/dam/sdc/dpw/SOLID_WASTE_PLANNING_and_RECYCLING/Files/SDCountyWebLayoutGreen(v14)%20-with%20blackout.pdf",
    'Food': "https://stanfordmag.org/contents/leftovers-into-the-trash-or-kitchen-disposal-essential-answer",
    'Wood': "https://homeguides.sfgate.com/recycle-wood-79134.html",
    'Rubber': "https://www.conserve-energy-future.com/recyclingrubber.php",
    'Leather': "http://www.leathermag.com/features/featurethe-disposal-of-leather-products/",
    'Textiles': "https://www.calrecycle.ca.gov/reducewaste/textiles"
    }
    #print(output_dict)
    with open('data.json', 'w') as outfile:
        json.dump(output_dict, outfile)

main(["Glass", "Bottle", "Glass bottle", "Cola"])
