import { Card, CardHeader } from "@material-tailwind/react";
import { useEffect } from "react";

const enterprises = [
  {
    id: 1,
    name: "Mouser Electronics",
    imgUrl:
      "https://lh3.googleusercontent.com/fife/APg5EOb3XnMjyPj3fC5MmkFN2D48cMI9lU6CNS0bcD2tPkkqAQ5ub1oll6hLLYsx3mvS-y9Ks199n5oT6oWuLgGz2rmgpVmLmn5Rq5z5XSeBUiBmnsWfPPL4feVH8slw9CgVh4ykCbr4p-uhz5kswPPArRMwcpmcb1IY1A1Ump2JbAxdw3C76zozVssoxwXEYgpoIotJ7__KqxlXI97mZI2DK04wj2la-WMKgO73lIEHc6VqdilZ6R4scOeFu1pFT7l1ZsiXSzgoU6EE8SXfMOZCm52fdDe2-rkW-s6s_CHIN1O1q3U00VDW0AtatQl6bMSahbaHQLF5Z4m7i5ck-pZich6qounHMt30ha2-afuq6ckQWi96eD2tp3ah9UOh57tpLJycrwA-RhaC55Z_DXsq_E2xxoABp0jtIt_DDvxrLMZBqxtPA5uGzhmg20w3iGN43dPfotflS6oYiO7l-nu5t9VTRq3VF16k0F70lfqRxB3Ia0QberqGIIgrYE5mmYKcLjrMCULQ0d3ivEmF0MOhzyBCpG89J3ZssD1g_18TGn3UZBZUySAxuRWKrKdZxHxMjC2T7zoHdk2u1tFMJ6xQCeXb9-c1BfaqoPuabjOdi1zq8-x4OutxZlRLzsYhUjfpNJq68oKfwVws-X7Nqzps7q_tnu6Lh129cVYz4tdIfHlDOTNB-vFdWC4Cuq5xyGLdIpxqDCQY6Ya_YaOVpkdtCnKCnsGDHwTx-Lrb9dRqi2Npo5FVoVmvHwh6BCdHJu_CxtEpebFv6yOdOX29gE2rTIMKGAeDqbCVEfjY0_XolSY87WYVgWQFbPT2l8L_vSMPV-peCo2RV0umRI91QZhbGVMJjlBz6yp8keVnNDs9HxfgCo92koG-r3k-WaDHFu9eN1b-cNoXDLaDUltg8R7pEBL73SEC0wdDh2CHioMp5AV2HOOswChSSe1KRimh-ZEi1Hbn0orAWAw3gTpWykhqxOml6XhRuqz-X__zUNF0Tz34bhQeYMt7s4Z8lvobbyJfw9n97zb_gQmYN7x1RU7YHa_cCIT-RZkcqLjIHSifY4OE6ErYvvKlaRHemv8OLbDLDnHbWA5jS6JFHlzV1Nyt1W7v2_IwdhQr4PuqG4p-bnDfYsqmllDlhv5OFfbUaqkRG2hhed8R-bTaHz65kNNzipqDflmlZO_MKkTb_vVN8nJTSCF50S_bTPfX5pLOYrcVDDfGlnqg28vUaVKWNdfa8KyCB9IrDT4sO7LX0dsimAXNIun1PDUFf0OPsLXPfXCKqUS7Yzi3OwoUn-2S29Uovs2G2ivsyep2WK29sMHH0D4VQXitEnhZCdFctelMaUqPeDceF9Md9tm0exKGMunmD_vckeHhh-nLCTcHGJEnoWgt2qrdTHQKgM95urgVTByNJfGBJXaFShkHYxoJxO8kTBwUAYMQhGGSZrSUIpZkLFMJIJfxQDcPFCOzO_p3lZZRToGObzFeBTXQwdCxtSO4qWkDpvfwj8jU-Aqz6yI7rSyi_u22R5OXRccZZ9xg4lB7_HtpGURre9YXVcsMnWyMQSYkgN60ZySlxtM2ljAPRcwKRckvDyHGSd6qGACUkO4l2lV3HqQAmy-5OGKNEQ=w1303-h941",
    link: "https://www.mouser.cl/",
  },
  {
    id: 2,
    name: "Altronics",
    imgUrl:
      "https://lh3.googleusercontent.com/fife/APg5EOaDA_DhaHuzg4pXrZPwqp2cJ8VuJZER4yKPVg2xQcfLTDEU6tDmmpFnTqL5OKq7VaGxBlsXyKqjvIFw-OjfSoJJn2s7dx14eXQ88acnlVRbBWRXJRykbBGPuBvkdBvxoBtWNK9Eu7ZZ4RFBApcetqq0Ji5QxxqOp_Q7vx3ZmPjwYwIF5IK6ufSrpOeP2DW_H6jBVi2gL626BJ_5gz2iO7DZTxxC1MYZaa0LdIDpm5dPSVgTXnpzabq6-rfZW71uslhvT6ZVqb02AF1h1zzvQ83rN3fnf5e89Jp16t0xwEo7Z-NmD54juXDXed_wwoQ41I98EdNQq3h0QulRhiLrhSBllPgXZrOefzkg61CF_hmkhxNVhxL3k9GwQGQT4Z5bMD6rRJp5PtAxO_072SZjGCrU6HIKhybuQ79s_muMWiKJC6S--EXbQCj6loCc6PJjov0xU8DW6W2Gah4_AdTF9PSZQxGeNwW6tN8UnusgOa7WwWKnlBUxGH-t8GKAlcv4ukZtdQHWKeVIku9ObsnukvLRAKW8rQnAbXCww3PjakVcYlNYRuj5szeqpSemUSL-l8xM9TsL9vuc-l3qLZVoHGoVGlU1rpHIsWzuRKTSanIkHGWkPHN_vs6c3BgB58GUrIkHXXy2-sQDbfE2mRf-kOGzkfZHkWM0XrkMYU9I3huyXcawacEyTc-NticPkifNaynLw3zmuh5qGHdol5Bo9EjUpFELY5Tk5iLHYq6_0IsfxdJ3meG6XXvUAXymZpN3YM9utgGGW9zRYYfkqQkqAQxMza_OBHV_PhsaSYdW1YZeYcpsEO3VlbVoWaFW5shPD8bvdJx0wYUoINo5Q6uPolAxxgtMoGJUInv7yZwoO7QPBnVOzs8hQDfjCv60pjK1JurwNVyLxQKwW0i-IYQLh1EWY4eP0uP3QwnNl6TFG8tuPehuLl1cBEZ1uk7BECuUOqMGal5oH4Rz6ukTTMRnAHCS_e1a7jC0TzqsIc6KD9Y5HKUub94lMsfuMo5ZCl-9Cb3XV3EBK3j0IKMnMEkpOxw0liMsqlD5SYBafyqvW7EKvdUhE69sPw9Vo3wvnEugCM8iWqF00u5zvB3hsq66uZSik5E8n3k0AUBX3tE8XO_4LqudFC7TXIfrl70gqqrUR5Fvh70PwOcsQrdT2IoWTvzD4Zw4L9y2vUejWJppEvOrXgxg7yNKJRDKXWEkucdDmsO0hmytsrU8Bms-29m4kPLncytbdZm7gHaOJPQLKlDO4YcLk5rm0GDo1uZrGmpyaqHNSa_e3TnVsnvk3eR_BJlYlJdt7-JFtKpWQWinnkVwGafsoR1-Vng83Sch8z679bNA-DKVqUcOcLNTgEhd-MWybvrvgqkxqii8S0Q-D1a3cOpv3cb0PdQ--Novcis2a-rWD0pfrWTD_E4sskl9SOTB2fg2tBWvLJXwA-qizDalQD0jBdjWEiAQ-KIkABGxxtl-lsJ6kyW0r712wDwyzT8kNU5vTigGzp7bFmP_gTh-QRJxtrROG6idZC7iQGj2x2FSF6QoNf-9ryiYjMiOgunewV0bedErWOzsvCIgZVu0AyUmFXPrOWeGQdxu_y8qsdSOMg1HGddYj4POOg=w1303-h941",
    link: "https://altronics.cl/",
  },
  {
    id: 3,
    name: "Newark",
    imgUrl:
      "https://lh3.googleusercontent.com/fife/APg5EObFAIX3193lu9evxUKhTw-c4ychjNOjKqiwtoG-N8tXTvect1f2QgA9oG3db-TaY1O9ryTQvxU5BUoKIyetJGNj8j9aw_SZLyNszFiAjVY1RbjXUib0pOh3vflPXqKTr3qaRb1IaVaSFm3yy2quKiV0DowNNgFVuIDxqW636Yks8jlmIi7UZIPZQ0X4eFpRIuo4zuTvgyS4nQ8UH7EUeNCsFsWXEsQh6O6jiR3qMxS4jOxojyg8wH43IYuXlOl7WsVjJRcGARUrpm4bpdadedVVfnRHQoIgDHiWy8kUqQkoi0X1y_9teUSgxkjRrnh4nqSr56rUabz77PbIR8kwdmV6NVwiltUbe_BByedfemOg0gfcO3A_3wDlGEbvE2voj3YBA00w6wdmlHeTht6Z2CEBZFrmliVAqEOUZ9qXKDo8qKctxLYTSAPZQflS5-kBu7wTQPUr0BOfRoJZF4nyLaot1y3FrzPVfuS4zGu2gGJtXPAcQ3tVLOFyOwcLU9LIvHHoYJwCobGAqCD_pkKTM08P_t-bTYEeDTAz7huafrsuk36VbbLrEkc9lKDJNqizmuObKK-SKoNiYSUNZZLsjac_4RlXLz_ojg_zP--rKqMZsAh6vNw-c0XOhlytvzvZf-FFdA6dfZ7fwzImw9LZPTgzYwt-nJTExYg346_60bcn7DlYCnuEWOb43Gm0cW6_OBEqK2YDbnY6aYBeX_WGdCHGs_VBZWp8cv3Cw76Pg53VA_T_fQbwgALRwRNQvO7nSYwQmxirBWPXQ8_BLe67kzp2Cko-Mm4JBcjC1ERiSv9z6jMiB62FpABJITUYRAjV1Fpe4Sid05Oc1IVy7YBLXX0LmdjW2iwRoFXCDZtLMIrVHcgMsS3kU9toTeT8clbzeK9kspJZOohR72WSyjo9eLLzEtA0-TOe8xpiUamdoPzHqpt4jgOC62PlczCyARwGYJFR8GS2Njbc32wpr-yUt2NJn5ydVDrg0fO9aM5l7Onbu7mTExY6ybIlplk6lxp5CNF9SvfT0POWKUWAPI9JIsztCRwURkKxyfepv2vi2zirhOxrjdDiJfNk8AM9F_vRGBHaUY2ufoT4dquAoKasWjO13XQdyeWC6NgvRvvmaVqrzVLTLfU95jyAaH5iQTAIYVXuzv0tV-8Hf_0DaR8STmBOShaDnusy257zuPJYh-PGpCFBynjjrzzyiT7h-b7Ic7bcoDu_0i_2M3SvttsHq6c4bOsexYuvc7_v8YAxCjoWBpRx1LiBIyI6_Zf4f2d-eJ4U40t0UljG_Uo_dKQRUvusXS8JRIXzUliMHBH8EIUKBqTw-s-wMgDTvB3BmM4_rhZvzTesILwUTJevTEyDBkK5ddsA__4yVbRQjMRXY1_fEeYEZeLSpThUOOkzhOtJdWKhnO-gSUDWaKE9KTz4nHxQUQyB2mdk8U9hJRqC4oWZdQvJcoCalr4wT2XQnp1JnIkiufHL8rMmav9EWkRH0qrxOjl5Cnhwwi2QeLSo8w98lt0o4rQfxfm7NIeRNwBdUHbHrN95idPfqXbzBgIPJLXxXqRbwjGj3o8KTid0aKBJAXHvuFr-Ot2Uvn1zZ7I5NyW6AvGJY10pP-IV4A=w1303-h941",
    link: "https://www.newark.com/",
  },
  {
    id: 4,
    name: "Galco",
    imgUrl:
      "https://lh3.googleusercontent.com/fife/APg5EOaKkHWBgMzkGlq2rniNtMXYnTIxcKYZayv1XBAzlks08Vtga9Df-p_cBw7mj4t0j82lH3G3XEf4pmxRvlcLeNsCAXovuF_-ORwHuegjCJmXSLOQRJ03iQvgI6pn4218kMaSWuVrM2NfNxtaFRiSGgQ69M7rjOPMfZdGJESOYii4ukkKCrFaTxCD0k47hMotU-XuW78VAvsKbwJo-nKPlZIVLPEgdFaEJpSaG1VbeOcU-SLi6nMLtD45LQLSP9R6bgGWrRE7ZtdGKvNrAdsVEhPUDWhvY8vvpeCy3KJ1tjZqvpIYraSgNlMDD6CrHda2uXQX2Eg7izDZlFFJYs39_qKvKItwyMPr-LtT0R28uQEp-G5N-7za7GkYsBwaq9K248C66hALdFI9fEbCgE0QgvnGTBcs7PqpYuuG3AK6_BSKj98L5hj2GkSmN5pXO8Ha3-bHGgetJ5XaswZtLxwK4Nq3etVqD90A4K1buEddbtXaZ_wKSKPEineluySakxeFqsxJk9vBALRIKU1RytyxlqQcqJXUdZcVVsRc_EE3Y-m8xNsZh-CcRTuWC-7z_zEDJ8UvcIiEKIDuUxDrLvsm-YkgvZ4vCpDNQ0QqjJsFgbDb_Td3si2RqOjKtk0bv_0SPM_fFDZd-VEBd62cg5LL-DT-N4r1ZiPRoLCsW9Q4LhiwUa8Q32WA_MF2vrPPpwd0KSWiLc5gNVBHfyyS3C9LM8p-fIIsVEeJWNR23LEEQF3atRzxIUqyEEpGIL0pqjJ_GNft7z6bLY3N1Hfs9P-sBJNER2yyoWb1IoR4_QqWynomGiwXcOS0Vh2bgglTuaMDGIflLNsXF4sfVOl9NFXHEC6cjS8O6Y0lyFYGxw82fOoskWlXfsQxJ3Ql37PBrJCa6xNKi0IvI2hNxUCrDDzCGRn6d-LsIB9N4hGdNW_DKyHuOxkpFwR_LTkKW6NgJiHoUF2PbqWelUvgILxm3EfKm8nbSF2BuB7LQ25x5FmhN9Zd8WzUOXNLx9PjJe2ilgONDQtY4WPsE12wox2rU_W4U7aV6MQsCD2UwlQQBqI-hiJX-WgEetfSXCMzfZeOzVnDR93UrcknQViwqdVetoWKvWiamDJG9qnE2BgFnQEUGamIRRzgShy1RstX4yvwWAlNd5RiMdMikS51XDAX0b9n5rSfKgTB5za6MLcKzqs_NIUOhSrwySsdrCia3JssywVGCdYAS4yNaw8WYRoz1xdA0fpVQVK4ynl9uWr_KUaeIp6Z32CFl3M3S_VksO7Flar_KKLSRJh559pYLLiIIwHGzOIV1yd4pJPs9Y0yZrHRiC0-fWY1RPZbBnQQhA8ExUZffwP3sUs6Q6CagjMKnFGqsqETMqs2cwhwHBhDrBFsO-ZOLOAhxbQReyB-VqmsD5TQ4w8XJzlMoD8QNV-t0eU8UN0e-PlpEAGo-om1GxuPRKVvjNCIEHNbsEJ1T88zw05GK0ZVN1POj3QmzXubNeaCyDleDaQhy3y7n12XeRlhmRW3DMhzBWBv01_Qfc3clojkhX1eGkclzSzfpwvMVAwWWnnfIy3tl8lo2BJ673iUMrEL3wgBcLEAroqoE0ete3MXSjNs11weq5wzKdZp6g=w1303-h941",
    link: "https://www.galco.com/",
  },
  {
    id: 5,
    name: "Roc Industrial",
    imgUrl:
      "https://lh3.googleusercontent.com/fife/APg5EOb2WaEuqc-HBen5gv39WbqhAA6dD8Z0tntqWQsgyWU-YlsIEdjQvLEGmawYE5MLO9YK4m14bGKsWLA-PIZCL0kQqALDJhj_EwOuLLn2CM5VTk-NZGABvOuQM0TGEHAqhNduB9y-9ScR4h59YNLhXZm1OPERKODz6OOrHeP93t2_mGV8H7C6cAbzviFT46u6IoCIT4-xTnZXrpXbX-8VhVkhZ3q98gNLWcEEx4d8FZFL33sH7Xhwkpnv3W4ZFyH4I8GeqUY6ijPNnlfU74aoAKZApjOtCfmccvkvrcgtryoKkKfUAoFVTYsdGtK8jBrj1srFsl5qXiD5lM4AiI-ME3IQwRy-Z5sRNkPWROn_FcDUw5YFAdlNVaDgv028cZNT2JBG2JeIKnlG3_Dekf_5Cw_xyR1tik26SrGNZc4UpgRl5p8gzR4AOxAqM-qXLC2-NYDkUQI0QU6RMVGBIp1P7tiCC2U6ETtIxMdMsWlxGkbCD2J3y_bvDyhKb5cQC22KtQEEN2LNe9Lf97gV1yDlK3OViuwqOAaJu0M_5gCuQFWvcyHW1eK_2-HUylqt4AdxxLMbEUwHPBL8FAX5yccFQjOH-jeJaPjee9s5E3ipQm3HrWcYMOuB-Ono0daRc7wfT5CCSWqgB2Iokc4yvAZlMyiDI88Mi6kWFHbseNanG-tDcZYAd9adSuCYxaau92KlBZRS4FVUJ2eB2X3x9ZfNy7a9GbUM9pMF-RPDLCYgWJRcvQHtitIFdPyCcLcdIPVqICjRHxN924sz5BDP4CXHL9GXIKm_xUi739GzsNV30Q0yZ_urLNNwXkZaqRNYhJ4w6aYFxMvXAFVrhrxxQMC7d0VKGg5GY3st94UkeYAEtI0UI-sv3sM9UmkNJJeqVgJtcucj04umU5_ONi_Ahy5m7UjK40t7F7mNTxciLOEJeqXYW1JnDUHQCb4qMniSaLyeYWDo9qbSnxZYPEBUFsvL562QDPq_yU9tGay1_qGAe3StMfIQWC0AetSDTSH-AxIoF5Prhry3LShNAZJjvgqmk1RhsdO3zlYIRC0ud1-mkfLcryf3C8C4kCZfY-ZqMHCqN82XDyLSqY9y1E5M9IsK8wKkfMTzwGG-LQl-tjlONx7OUzhW6bENiZq7xS5OaCLfqNQIKgO3quGZCtldzTi0AwHYc3ARfZF8wwIZtu998fvaQZB4RIZGugp5ceRTXHGQfZjypnh2vNUfQLepVdMf1LrfoDpZ-z4DsMtghRyKmBYrk38c-uUJb6k4uS4XfHGg3TPOyvJTjQp20wzPrVVsKkcoNNYd6oI4pqbA69NYq5sXXSRU3OLsXBjGS5rhUVbJpFO5bXfipR1uS3ccOrnTeTzAcdtucVjlPPZEhJ3hSlMdK2BJ3yROU9LDw83purH_5-7-dswPbOEk1O5fne1q_9DmqF9hqGUAgY0GRJehMYTe6G4AK1-WmFRwwZIup53U7glKIsk3V5XXkCPuVFC8bN1xnwfzTY97Hck_tHpsxSiP52nkYpgEf4gSuadBp3e7KAJxNJZ2sMLWhoOl57T3E3mb1fD1UYI99Bm-J_-UCDI6n3CnoGLfbzSpuF_ZYYJWI47_JzoWAdoXVqHrhw=w1303-h941",
    link: "https://www.rocindustrial.com/",
  },
  {
    id: 6,
    name: "PLC Chile",
    imgUrl:
      "https://lh3.googleusercontent.com/fife/APg5EObEFqBrHryRnvfhuMrtQpPPzaDCCQ7nUIuXp6sC6YMVG24SOlrsg0QFBlP7bg36AYstee9C-Q-JHesNBAu99GLuUdU2Ah8pks5BI79__3P6e5KhReY7IK0thjh_X-9IdX7xWqvPY7W_gmE04CYQ2foWZI5tEGuBuvYUEvvZvohBuI4qzOW6M-H4iyOsGWxNWySPcDNSnwfkJ9G8ehVkiWCRJuAjleWVgIUD-oXPYvoRLjCHVCWN_vlQ5IuMguPD9CIMDPxrJO6Uf2RjcJHDBKuAVZ7x2Zc59x-LIxn2ztWj-jF7Q_kdZXzK2_TLFJ9CYNVVzhWIJg0YZRmYW4tAYWVtUDRRrEDj4BIPC4cHoMU1isNWAlNuTfii9_aUfVc1abbAcDOEKNnyEvvEeLngQCbdlqgx08liGgynYfbgk37Ehff5hJ069WgDSLkn7PVw2flcpL6GCbAdMEA3UnayiAJKeOxm96994x6BGCGli_r2qTZC_-_8C1R0VuD15CwJngK5_3ovsPxa4La_CDYu75BgrDMzmaZdhy6x1UyXdd0CP8aKt9Sxdm3lQdlxn1VjVNK0Wi13kAEjBD7ZXGwmLX0ZrawTlE50Kt6r03f9u5fgrPdpljBbncVE7r-Y330QdG7O-t_7jECNsz7L2o2glLANwxgfS2RUGIIMoCJtu9JjGSebhzsRJYsVA8XZ6p3SWhkwiwxH-kbkd4QjbrVwrnODMUx9rEEeTFZbfX34kWMJD9wFFBtPZDatHeVPS8UrKluX2zGKRLvOFClZvIDDOG3V-q9sNX7iiq_ltFvp7mL_sXfJXU0Z8ImC-SGHE23CwNUSyV60MZ8ylLeDqGS16FcbCGdKvD1AvV39fBg9WIDmKWqu1TiYu64OCWPy8cCdyGqevRiWY5wW9ZVwJLPVmmGtPeLDE3sx7R1xUDWQ_cYskWg9f6Lvrwi3uOuiy1yo5XhaT7ot7y6xsrrIANN5nbHEjPOYoFseEQeROsos-xKdAeoNhUX6L5j9lRsAM0k7hdVMyh_dEOgdcvL9AfKTjCu93hTernMdYnI_jo0LGc3sxxzS9Nr4aenGDfExeqBHXfEo9m0cxb9IZ6MzhN43ZB7-0hVo5H0CakeMeCk8iQ_MX9zo56onowuV8jtc_WlBMM9Oamv7H27cStaIOrjaYpXPqCazDco_cHtpK0l5Tc-T1PRrk7kk8DhURe9TVFKIpNBsm_zBzPBZyF4Q4VmSjp6AqCZfc4-Ksp--mYQFpYr8IAV1G7fwhPUi51b9en-2yHd4Muy5-xHiC8gV1y_CbXuTizwJrGPkwtpHPnpl4AxquKDFVugYpd6FQ_T5cHCgR8W8Epo_3zhKGZXA3TM4bGyH-3Gnfm4Ajruccx8Ck9zANVPzmp1is3kJRrUcIqBUnxFV4ToBP9JAtSmlnYfvacWQisVZcpYGc_KHROI6Yy4acwHVKZbvzeU5nridep0nKb8jdCFURylnY87aB2EUilRhysJhdIS7-mJu0YI4tnATiIw6ywIkpFywiBMEU7UNc3utVORCo6_h3TAxDBVjsKfaWZsewZO5dNfo5yWfdoTQ9zvbHGuAQfZGrxK-awnaD6HPWKVxdMp220IuTA=w1303-h941",
    link: "https://www.plcchile.com/",
  },
];


function GridEnterprises({ enterprises }) {
  useEffect(() => {
    document.title= "Home";
  }, []);
  return (
        <div className="mx-auto grid max-w-6xl place-items-center gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {enterprises.map((enterprise) => (
        <a
          href={enterprise.link}
          className="h-full w-60 text-center shadow-sm "
          key={enterprise.id}
          target="_blank"
        >
          <Card className="h-full w-full">
            <CardHeader floated={false} className="mt-0 h-32 py-1">
              <img
                src={enterprise.imgUrl}
                alt=""
                className="h-28 w-64 object-contain"
              />
            </CardHeader>
          </Card>
        </a>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="mx-auto flex h-full max-w-7xl flex-col justify-between pt-20">
      <section className="w-full">
        <div className="p-3 text-center">
          <h1 className="text-3xl">
            ¡BIENVENIDO AL NUEVO COTIZADOR DE TRY ALL!
          </h1>
          <p className="p-3">
            En el siguiente enlace puedes aprender a ocupar esta herramienta
          </p>
        </div>
        <div className="py-10 text-center">
          <button className="rounded-md bg-secondary px-10 py-2 font-bold shadow-md hover:bg-secondaryHover">
            ¡Comencemos a aprender!
          </button>
        </div>
      </section>
      <section className="w-full py-10">
        <h1 className="mb-20 text-center text-2xl">Nuestros proveedores</h1>
        <GridEnterprises enterprises={enterprises} />
        <div className="pt-10 text-center">
          <button className="rounded-md bg-secondary px-10 py-2 font-bold shadow-md hover:bg-secondaryHover">
            Ver catálogo completo
          </button>
        </div>
      </section>
    </div>
  );
}
