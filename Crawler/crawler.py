#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys
import requests
import json
import os
import base64
from Crypto.Cipher import AES
from pprint import pprint
import subprocess
from xml.dom.minidom import Document
reload(sys)
sys.setdefaultencoding( "utf-8" )

def aesEncrypt(text, secKey):
    pad = 16 - len(text) % 16
    text = text + pad * chr(pad)
    encryptor = AES.new(secKey, 2, '0102030405060708')
    ciphertext = encryptor.encrypt(text)
    ciphertext = base64.b64encode(ciphertext)
    return ciphertext


def rsaEncrypt(text, pubKey, modulus):
    text = text[::-1]
    rs = int(text.encode('hex'), 16)**int(pubKey, 16) % int(modulus, 16)
    return format(rs, 'x').zfill(256)


def createSecretKey(size):
    return (''.join(map(lambda xx: (hex(ord(xx))[2:]), os.urandom(size))))[0:16]

def init_xml():
    print 'creating xml...'
    # Create XML document
    doc = Document() 

    musicInfo = doc.createElement('musicInfo')
    musicInfo.setAttribute('xmlns:xsi',"http://www.w3.org/2001/XMLSchema-instance")
    musicInfo.setAttribute('xsi:noNamespaceSchemaLocation','musicInfo.xsd')
    doc.appendChild(musicInfo)

def writeXML(script_json):
    # print 'creating xml...'
    # # Create XML document
    # doc = Document() 

    # musicInfo = doc.createElement('musicInfo')
    # musicInfo.setAttribute('xmlns:xsi',"http://www.w3.org/2001/XMLSchema-instance")
    # musicInfo.setAttribute('xsi:noNamespaceSchemaLocation','musicInfo.xsd')
    # doc.appendChild(musicInfo)

    with open('musicInfo3.xml','a') as f:
        for comId in script_json:
            if comId['id']:
                url = 'http://music.163.com/weapi/v1/resource/comments/' + comId['id'] + '/?csrf_token='
                req = requests.post(url, headers=headers, data=data)

                music = doc.createElement('music')
                music.setAttribute('genre','XML')
                musicInfo.appendChild(music)
                # 1
                musicName = doc.createElement('musicName')
                if not comId['musicName']:
                    musicName_text = doc.createTextNode('null')
                else:
                    musicName_text = doc.createTextNode(comId['musicName']) 
                musicName.appendChild(musicName_text)
                music.appendChild(musicName)
                # 2
                artistName = doc.createElement('artistName')
                if not comId['artistName']:
                    artistName_text = doc.createTextNode('null')
                else:
                    artistName_text = doc.createTextNode(comId['artistName']) 
                artistName.appendChild(artistName_text)
                music.appendChild(artistName)
                # 3
                musicUrl = doc.createElement('musicUrl')
                if not comId['url']:
                    musicUrl_text = doc.createTextNode('null')
                else:
                    musicUrl_text = doc.createTextNode(comId['url']) 
                musicUrl.appendChild(musicUrl_text)
                music.appendChild(musicUrl)
                 # 4
                blurPicUrl = doc.createElement('blurPicUrl')
                if not comId['blurPicUrl']:
                    blurPicUrl_text = doc.createTextNode('null')
                else:
                    blurPicUrl_text = doc.createTextNode(comId['blurPicUrl']) 
                blurPicUrl.appendChild(blurPicUrl_text)
                music.appendChild(blurPicUrl)
                # 5
                albumName = doc.createElement('albumName')
                if not comId['albumName']:
                    albumName_text = doc.createTextNode('null')
                else:
                    albumName_text = doc.createTextNode(comId['albumName']) 
                albumName.appendChild(albumName_text)
                music.appendChild(albumName)
                # 6
                comments = doc.createElement('comments')
                if not req.json()['total']:
                    comments_text = doc.createTextNode('null')
                else:
                    comments_text = doc.createTextNode('%d' %req.json()['total']) 
                comments.appendChild(comments_text)
                music.appendChild(comments)
                # 7
                nickName = doc.createElement('nickName')
                if not comId['nickName']:
                    nickName_text = doc.createTextNode('null')
                else:
                    nickName_text = doc.createTextNode(comId['nickName'])
                nickName.appendChild(nickName_text)
                music.appendChild(nickName)
                # 8
                createTime = doc.createElement('createTime')
                if not comId['createTime']:
                    createTime_text = doc.createTextNode('null') 
                else:
                    createTime_text = doc.createTextNode('%d' %comId['createTime'])
                createTime.appendChild(createTime_text)
                music.appendChild(createTime)
                # 9
                commentCount = doc.createElement('commentCount')
                if not comId['commentCount']:
                    commentCount_text = doc.createTextNode('null') 
                else:
                    commentCount_text = doc.createTextNode('%d' %comId['commentCount']) 
                commentCount.appendChild(commentCount_text)
                music.appendChild(commentCount)
                # 10
                shareCount = doc.createElement('shareCount')
                if not comId['shareCount']:
                    shareCount_text = doc.createTextNode('null') 
                else:
                    shareCount_text = doc.createTextNode('%d' %comId['shareCount']) 
                shareCount.appendChild(shareCount_text)
                music.appendChild(shareCount)
                # 11
                subscribedCount = doc.createElement('subscribedCount')
                if not comId['subscribedCount']:
                    subscribedCount_text = doc.createTextNode('null') 
                else:
                    subscribedCount_text = doc.createTextNode('%d' %comId['subscribedCount']) 
                subscribedCount.appendChild(subscribedCount_text)
                music.appendChild(subscribedCount)
                # 12
                province = doc.createElement('province')
                if not comId['province']:
                    province_text = doc.createTextNode('null') 
                else:
                    province_text = doc.createTextNode('%d' %comId['province'])
                province.appendChild(province_text)
                music.appendChild(province)
                # 13
                city = doc.createElement('city')
                if not comId['city']:
                    city_text = doc.createTextNode('null') 
                else:
                    city_text = doc.createTextNode('%d' %comId['city'])
                city.appendChild(city_text)
                music.appendChild(city)
                # 14
                playListName = doc.createElement('playListName')
                if not comId['playListName']:
                    playListName_text = doc.createTextNode('null') 
                else:
                    playListName_text = doc.createTextNode(comId['playListName'])
                playListName.appendChild(playListName_text)
                music.appendChild(playListName)
                print 'writting...'
            else:
                print 'id is not existing...'
        f.write(doc.toprettyxml())
    print 'closing...'
    f.close()



headers = {
    'Cookie': 'appver=1.5.0.75771;',
    'Referer': 'http://music.163.com/'
}
text = {
    'username': '',
    'password': '',
    'rememberLogin': 'true'
}
modulus = '00e0b509f6259df8642dbc35662901477df22677ec152b5ff68ace615bb7b725152b3ab17a876aea8a5aa76d2e417629ec4ee341f56135fccf695280104e0312ecbda92557c93870114af6c9d05c4f7f0c3685b7a46bee255932575cce10b424d813cfe4875d3e82047b97ddef52741d546b8e289dc6935b3ece0462db0a22b8e7'
nonce = '0CoJUm6Qyw8W8jud'
pubKey = '010001'
text = json.dumps(text)
secKey = createSecretKey(16)
encText = aesEncrypt(aesEncrypt(text, nonce), secKey)
encSecKey = rsaEncrypt(secKey, pubKey, modulus)
data = {
    'params': encText,
    'encSecKey': encSecKey
}
print 'creating xml...'
# Create XML document
doc = Document() 

musicInfo = doc.createElement('musicInfo')
musicInfo.setAttribute('xmlns:xsi',"http://www.w3.org/2001/XMLSchema-instance")
musicInfo.setAttribute('xsi:noNamespaceSchemaLocation','musicInfo.xsd')
doc.appendChild(musicInfo)
# Call PHP scrtipt to get the mucis's comment id

proc = subprocess.Popen("php /var/www/html/test/getId.php", shell=True, stdout=subprocess.PIPE)
script_response = proc.stdout.read()

script_json = json.loads(script_response)
print 'executing...'
writeXML(script_json)
print 'finishing...'