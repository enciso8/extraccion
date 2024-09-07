import requests
import pandas as pd
from bs4 import BeautifulSoup
from collections import Counter

def get_biodiversity_data():
    
    
    
    html_text = requests.get('https://cifras.biodiversidad.co/boyaca').text
    soup = BeautifulSoup(html_text, 'lxml')
    data_table = soup.find_all('div', class_='flex flex-col items-center gap-y-8 lg:flex-row lg:justify-center lg:gap-[235px]')
    
    all_data  = []
    for all_data in data_table:
        product_table = all_data.find('table', class_='')
        
        all_data.append(product_table)

    return all_data

   
    
    
    '''
    # Definir los departamentos de Boyacá
    municipalities = ['Tunja', 'Duitama', 'Sogamoso']
    all_data = []

    for municipality in municipalities:
        url = f"https://api.gbif.org/v1/occurrence/search?country=CO&department=Boyac%C3%A1&municipality={municipality}&limit=300"
        response = requests.get(url)
        data = response.json()

        if 'results' in data:
            species = [result['species'] for result in data['results'] if 'species' in result]
            species_count = Counter(species)
            top_species = species_count.most_common(5)

            all_data.append({
                'municipality': municipality,
                'total_species': len(species_count),
                'top_species': top_species
            })

    return all_data '''

if __name__ == "__main__":
    data = get_biodiversity_data()
    print(data)