from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import re
import requests

app = FastAPI()

origins = [
    "https://dataset-theory.netlify.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/temples/{province}")
def getTemple(province: str):
    provinces = []
    provinces.append(province)

    if province == "กรุงเทพมหานคร":
        response = requests.get(
            # f"https://th.wikipedia.org/wiki/รายชื่อวัดในจังหวัด"+provinces[0])
            f"https://th.wikipedia.org/wiki/รายชื่อวัดใน"+provinces[0])
    else:
        response = requests.get(
            f"https://th.wikipedia.org/wiki/รายชื่อวัดในจังหวัด"+provinces[0])

    all_temples = []
    dataframe_list = []

    for i in provinces:
        # response = requests.get(
        #     # f"https://th.wikipedia.org/wiki/รายชื่อวัดในจังหวัด"+i)
        #     f"https://th.wikipedia.org/wiki/รายชื่อวัดใน"+i)
        response = response
        # temples = re.findall(r"li.*>(วัด[\u0E00-\u0E7Fa]*.[\u0E00-\u0E7Fa]*[\u0E00-\u0E7Fa]).*ตำบล[\u0E00-\u0E7Fa]*.*[\u0E00-\u0E7Fa]*<",
        temples = re.findall(r">(วัด[\u0E00-\u0E7Fa]*.[\u0E00-\u0E7Fa]*).*(ตำบล|แขวง)[\u0E00-\u0E7Fa]*.*[\u0E00-\u0E7Fa]*<",
                             response.content.decode("utf-8"))

        notfound = re.findall(r"<b>วิกิพีเดียยังไม่มีบทความที่ตรงกับชื่อนี้</b>",
                              response.content.decode("utf-8"))

    all_temples = list(set([temple[0]
                       for temple in temples]) | set(all_temples))
    for i in range(len(all_temples)):
        if all_temples[i][-1] == "<":
            all_temples[i] = all_temples[i][:-1]

        #     dataframe_list.append((pandas.DataFrame(temples), i))
        # with pandas.ExcelWriter(provinces[0]+'.xlsx') as writer:
        #     for i, p in dataframe_list:
        #         i.to_excel(writer, sheet_name=p,
        #                 header=None, index=False)

        # ans = {"Temples": all_temples}
        # len(all_temples), all_temples,
        # return len(all_temples), all_temples
        # return len(all_temples), all_temples

    if notfound != []:
        return {"Temples": "Error"}
    else:
        return {"Temples": all_temples}
