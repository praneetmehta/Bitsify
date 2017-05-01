import urllib
import urllib2
import sys
from bs4 import BeautifulSoup

textToSearch = sys.argv[1]
print textToSearch
query = urllib.quote(textToSearch)
url = "https://www.youtube.com/results?search_query=" + query
response = urllib2.urlopen(url)
html = response.read()
soup = BeautifulSoup(html, "lxml");
for vid in soup.findAll(attrs={'class':'yt-uix-tile-link'}):
	print 'https://www.youtube.com' + vid['href']
