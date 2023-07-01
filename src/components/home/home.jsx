import { Card, CardHeader } from "@material-tailwind/react";

const enterprises = [
  {
    id: 1,
    name: "Mouser Electronics",
    imgUrl: "src/assets/mouser-logo.png",
    link: "https://lh3.googleusercontent.com/fife/APg5EOYgWcNO5r2vlc9d3WAN5CtRsvBarV2jY6J0OUrwjOFmaX-YRSL6YcVI767gnuBxG6XJSjuK2EIaKQb7sA05QPIi3o2BotrgNWlfFINfv5nhA9mDow3K2jxg0kJJ1SVJPa2TZ6FRvdWFLBYkAuZmagyyVK9mKoi9pSVtveufTcEcy5Qk8Hg_z9dGLcVhZwhelH_qyQkLmEzbhzoYLLmogF-UNgt6XmPAHFR5bAXwFkyXHITyd2uBk7eBpJznxpUhLj1G5cCOoUWQBQdXxM3BfAqVfQQxetFgS4PsTySeqMjU1WE1xRQvhzJd0if9AqBTMpHszqw2JtTGOBaxgXYU6Hg8I8vARcG6QoOR_P-7kFi99t16HlbTkmYQbwRdBRg-s3_nv3SCsepHP50z7A-q6JmtEo460NN618eiI64K91rjl_gdp3D2C_hbKcxjcnXsuwIfjnWGVsEEDEgqbbM4fGprHhwGOnk12wFK52uIaDpwboTWgD_XtLd1KvTXqYCtTIraxiiKmJupYOIQY23q_K3zyo-6tTHL1LUk9Jk9YeMN7-PQl9BjSyoualb5aJKaJLE1348Xk6HSAKIQ6fSUGQ68PGv2PwHdkVK3D-7TdkAU_zaV96hFCDAl8X9_zjBEX-YukXvdnUIqUfUN0AQvOMlI5njA0MOAXXAHExraVflfMjrBpFGvji_L8z6spYoVamjpPBHDBWYfGoV5_mCphoxMam1_Oi4_07gjnx_1Ah4DqivSPrVqXb_DIPNijw-zRNWh4s-ZBRJL0II2yn_ClB7R0-sB5vAPhVsW0ElnbfKjWdeUOiIfSj150iNbBcpsqfAcmUCwKGAJ5gVbb6HhzANqOPpwFUw4syM9l14OiKcY7hxRdFebCxheck-vPlyugc6VZhZkdl9IK-GCgTexU83WGBtvrjk_XZNTBg643eSDFubBe9zXwdN5a-0hcKwDL6F1C_FG0gs0NCGueirdHCh57T15JihCqC-9TU2qMIzRXtdXsxPt5V7RIaAZJy7nAJc1tE-RPvDRTV3AjSoxYKP6JoKy9L-dOBPew8pKer9t1p-wvmd6F9l0xK35mZQq6lXaXLtZCRYZTdm7l1M90M6OqqX6GoGWP-SZSUueupystOQYYb3GP1S89VLsQ-k9r3mSxBoVBNh6zjrmo9hLLsvv43zF6RqCGeq2XLIeJWABK1ZFzlzFT82M7uyv7v0wpdiXnUngSwC4eXIXW8fUgKzn_WjVuy58fppPHMRGa6V0HrLITturWd9UHYge-l3qE1cs4_RI_6LnbG8_SulGgC5t310GiAhyCWW5sw2rV-7IgxAqK7-kY-wV4UYyCTlXV5ol4gL0bsoCZxuiyGFV9-uCpcrD0IDLeDg-Gmu82ODbCxrGxOI5Efuh6XB3nSmQ9BuAUyDVnthI6dd973AR2h691WDurk_nU9ATB8o0MpuEcifLIcsAf4NjUg2K6163WqbBeEZoH80LAUyLBSEmA8gZwA1t9_fLBALM3WKF4JVTZwgenJap22rSCI1oKykS2Uh6g5ZqvGfwoFtcfxImR5VIWwrPy2i0OCJRGJLD4khT919cTzEQsVmt9fum9yM1RnFd_leB6v-BnB__aA=w1303-h941",
  },
  {
    id: 2,
    name: "Altronics",
    imgUrl: "src/assets/Altronics.png",
    link: "https://lh3.googleusercontent.com/fife/APg5EObcMOQw6JWopCYOyLPyAAF3wib9Fsx0RTB1USx10stJJ_qsuv84XtZR3PJW3LeMfDhcuHFbgVQBDjCBtqXrI_8eEV-GNKUO-mZdpbbVTbGa5sFy1cnqBGYvNUgVNl48Ek6xBl9r21Ik7SPXJ9k-OJ_0boNQx9wy1KPdjIDXGlKjs2prxgvJG8WLfEYzNoWpo8D5LAAnhRRPlKqwhpfyNObhkivaLn_tWKdl2VG3tLjo285CemjvK4TrV52oOgsHGSz9xfppszNn9FcG91zGV9sQbQBqgBghAUWLnnGLIwmpWwfti8cKRrkKLeGqfTcXXUuUb7Dd5fb0QtinxUr9eYYHhoAez0KZUFEmGfvBAfxJrRUVuEsbt2axgr9JQ3hyYiVeh3z3HHEVjCbimBCPcLM91TyCMXOxTRIpy-102KaRREMUZNj-Og_StuoXEHWk7LP_E7slzneEbyOjU6utRB_fig7qLWooFFO3z4KM2ipfavnUcQS_hJwdSEVANiBMq-bqEiK43kn7NW1_xsva7HqmkTQgFYQYQcZdinND2ET2gCRJ4gU4WzVAMAUyZmLsBckACotfN5N04G1O4872f-vtxUtZXCJ63nCszm22bD2g04ItYGlY-909evEcPpMBYOCjscb5KlgH2X9DUZj85BBmlUrWOqMREGxHAiqOVxEYEymNnoA5Sg1LVDviYdGe_C_4xrhT2cfEppkFH8kZ9V-KMviHf5CeaeWUv89lKgixKwL7LDcpO7oPiOSzkxgF7IdhurtnrWbkJfsdqsvEktIss7oL6eM13_ODtFMg27Yethg1RqBnmQQNMOi3y_ZvNtkSlXqtjYSHgwmf3d9uCx6ub8uuq6ZLLsn12oxtIEgSfJ-1sIDkmdr84RFKFvwbfQrhgTtOfykAIOqu4PWbB9C9-GxSPF-bDwjShJmc-UKdbaOYUEO8tCOMd3yHoCGqbVC9C2VJ5snFhA1Q3VwEf6Xw5pSK48UllFsDtzWbmFjfbyG3JrbPVneGLRwCbwVjY_aaXW2uSxErQf0j2wWU3Qf8zDfguN4DLFVHsFueYOQWo2SUZp9cnUzoQ6cDYlgatkzsR-KggIyqvzzd3ZdOpXsCnmxXiFlGy1xvFIN4W_pTpgYUnPsRYFpnO1PZenyJTeqR94Q7GjZ1fHhVYbIKZsiwhtFUMDNaQp4Ey3AkjUPvGYhU4TZLbQBlg096eq8jPJ-gnW4Gbxj20JBqqf2jKR4HHpzjarEl-QhaIJhg_0Jz0yQqtPI0dfStqdmlDMLsxK1BPZc31XaR99JBzZpfyuuug0mXdGeKRKS5e50c3sOUQKv-pcfmXRLy28UZPj92uXVhBiGbx7kFvLZi5ePkBpnH6ooRgPPyaA9nvtiJdG7AMl8-ia5ko_-V5L7G2et59nMKJZ5JuM6CIXidyW1mojb2UETQszp3JEpDzdWPDtIfD2CEo7maWhOl0EPFVyUz-GT9Gi8mP50cApfctIIRsGhOjiGkNj5o_RamIHRi6sooJ98fL89T5BTMBgLraR582s5KxAFWiBbHcypNS7B5ZQ2E_LEsR_WqmQpavJXvXLOonIRPsafcpxlzTNC4RMvUDReSAWChJWsJFBYdgw=w1303-h941",
  },
  {
    id: 3,
    name: "Newark",
    imgUrl: "src/assets/newark-logo.png",
    link: "https://lh3.googleusercontent.com/fife/APg5EOav2nLkO28Xqt6IDIzGrYS1jzTzEo4Qk33yKY-Zb9YcIjm-JXOmO_9CPVm-L2FqNhiG4hEfZKrujt5789nln9Lcr66fwplCF-YQvl4L5x4KdEaM5jcFu71cMoa3hR95jL1NNAY8hSwzW2q283mAGwWUyEQs3WlGv-goZg5Tcog2sTD9wGn73fv_RQXBBx3B9BaCRPOD2k-26kXKv_tL8pwAnDbmJgznw7VP_r9CYPBRls-PqG4P5Dm-zJH6rwNibuccFIdIRo3ZKFOI9APqoPtSj0LuCIbXh47LjmlI7_Ds2Ng_Q_Hy2I5WkauAVLRhevAt-qNpaAr9Ubw3AbEhzpWhtGFp53wQ7NY5AVJ5S_Ar5JuMTAj338Y57LaBerD89tfI1VIFW8uuWYuGkBRorqRAHfl1395rBQ9Uat33CwN7bsXIibdvtWGmp2E2MbDziLG3YBidKG3uZPFK9KgjnJKKHNezFZyzgpe4Yoz1RoBPOzlbzkaaRqVy61uXsH8U-1IyRE7Rj8RTQIJqiuJOFCv6FWKA7X_Z7bxWa_aNIv8QoRdTy4iINj4Xg6owT7P1yMy3CHDKTJYfzqKPugPPFN4ku1QWs2IyD_bJ4HFClfdFJceyA0HCbVB8nhJT32AAHHkhYnuABSNuUHGQc8LifP-MWcLnKA8YP4AiAAcvdP9_e-UXfRaE19r07k6aA5FIsHXIyW1uWvJcwszCVGOqdvIuUGI9lyxlhW6P1wMsmnKhi1-Re3kOlL5wNsihF88t3eri3A2RngbtHHazMWj4LGK0Uhumjyzg2RPpJkjYf8PHGk6Q9S6p9f2hXytZk06_KcI_cda9oq1mNPO_4gzYeZyxVK6nJPQfiZgLkCUxk1pv7k5ZTeKdTAqkHz4Ih30Got2ds0Pj-lfuWqlZAAPm_3JQy4yIGKN9IO1yM-yxtUHBUeMkR7SnY3qeZwvVNnf8ZQKLQDI9uDMoDvcPDg5BmNl71CRZ2wM3fqOz4fWKBSg5wpoebJ-E8FCRRZMFVa3Op9OxKQE_DKoUjbGVFmjdSncx7MguNgwOCwHtdEIiSwZHHhZ5Il_DGlQ8FYcmB0-s4jFAgYpDaX0XJEjs9vBTCjs3yKpAFcm0XLHLfUdxWISuXvVEmAj1aeDkJ5_0L5hJfMkja7RqVlrexwKH2x4jxvH3FVLybGvSf0eQgK4Q2UH-5Hm73f7UmWAoTqlMHiFtBRZ7jgUUBWUCRJMVnRKwx8CdPnktAIiKnz1qT0BK3ckMGqDeFwfTjf70wU7XygU8oNz-_CGsi3d-bWfFfZSm4dlLih85eWjf4V-h7MMKWSNYsN-lg__uV0MvSI_hOeJmYx9t02NcNGV9Y9orwjrEsgqRzVa1vZyTWVN-K1CPUZX0qrnSMquDQOtZz8CYwTFR4UgM63ZwpGqfjNml1zeBEKMBuj9ZjCDVTIFIM8HlbThno6FXxDsc0My98-B3xoNK53pvSOe9PwY_Svf-Q-dg9PIc1PhFG4nOyX1fglcpTNMeIzyMcu6mVkXa-00ptj2cuHoiDWE8EbCVgj5ys43H7UMV3R65QGUddd0oKruNsMmkne4QIgMPBITBWWSaycDNEITTaZ3ibji_fI_IFA=w1303-h941",
  },
  {
    id: 4,
    name: "Galco",
    imgUrl: "src/assets/Galco.png",
    link: "https://lh3.googleusercontent.com/fife/APg5EObJW83Ka9Z3f1E95okscrFpUb5YD573k3xg3_rhky9dQ7NTsUlJJ4IWTG8uGfnFyep8Ux98nt1-6RGiGrsMysogUxtMHLWTYvaf3zQZvl5HLJ5CKBCfZidevZxxfxESA6BSZJ4ungeDzaA4cFyGC6JRr_HZwlcvDEgctjFphu9LIxcSrh-piI5n7PrGiFkir6NKczA89rnqd5eSl64lJc_K6BAzDppotGuEc3ksyabB1bC7dirndwvfDpK_7npaO3lWBtkmdYvPcIOBG5GLuyaDz1VIq51x_cdJmU-52n56c3Zfdk-yogdxaARKYvmwahrp4H6VsPJilrjSoogl8QIgPKUc70uf8breTZzIeGQFpPx9pD0wlbpnnMBQtlCE8ET1hnGn9VMYGoohFIzJ0tCCtC-b0txuVRk_y5sSM3KkFTDRE2QUVA_LROdTGQoEFrm7wxIAUzvxbg64mnT5fMXpTAgnt3AoyMW0jEtb0pFbMiq9Z-yIkb8_MieOFr37dn9UXYodxy6zlTXUqSTuNXtRWkx1Ism_imA9Ft04TuvVurcFEKYJmtmoKUk9VS9yreSRh4XsAl5qXotu7qs64EjnrRG3kLUEa-XyfRjSrhNb2ttxSqP7ivp8b3RlpZ4o4BXiiW7r6FSbygIw8tbi81bfCXwxvvF9NHUqJFuSwQlEfUEWU7IfGHqRpef3cz4i2RDYTydm3KpOZGDZL57Z5RzPF8ccID6NFY9xdTy6KLp2eTSJvW8zf_Jq7KCCsVJVMoBFsiqM1L44MgHIcUNR2mEWf1ZNtMQtM5Wrf8AznuPEVqPK7oJ9BOv6IfP6PTC5ZsoF3vOxapw5v2sh00p4Z3zqJh5IQl_TmjhFRp0cLeMxi5S8RD0k13N075yAn7lKqIlx8T5Mjl8j5cNqvhH2tewYN_N1BO8M6Utse54UtgUDjJtb1pI9O0DFH7U2icQJTrDZyzGEu4fYiOklgO1Omwo22kMSBC4-BJBnPV2dnZ29eJK7WNSJ8dU6ttHgOJ0y2NKbDErqgmnmSdnVcN2X1Jsi3rHJrrCH67i7oExOhOOOK9jaGxDjK-Q7o-_PcC7gP1V5-7JVwRnuauQCvve7mP-PwgX0QwN2rI1eCvdBayo57bdvcrBNTr9gKZqfYmC66skI9QsWxYS80BwSWVKOCk6wAsuHYh-ovJKkn2zSc3VDp5qMg5LNDRbQQDhvgGVlIg7bhVs0OuE6i_4BEmiydzP0l3gAlnDkxNHBDuoJx4rA9Vns4zDQA_PdZMsxGdTKJDQ9sML4MfxlwO1r30kRFtSusKkcjt13zykeyzEf4OUOFGdGUterApCyrWzHdCGhx5vL7UmD2AHzy9W3LmBtImUovOdDNxji4vaAFaXRFR8KZIoq3H6Th8PgY0_7NgcQpmJHrkjZmT5a6Ykf6xPunLzCqCAZZPx8oa-AMrYAXbW7zx-wHjL81OMv6OAwk0yhIfxmAecUzzUvWqGk3Nj6f0ZI5yOPN8V4TBGahj1OpvbuwbJz9qqlRnlDiUVP9XgEV_3GnMte5cMM13Ar_may3sCdXj5R40fPxPyHR4yARKzHoMIsdyvqSXOIB-V3s-jehhnU5OhJjHElMR604Q=w1303-h941",
  },
  {
    id: 5,
    name: "Roc Industrial",
    imgUrl: "src/assets/rocindustrial.png",
    link: "https://lh3.googleusercontent.com/fife/APg5EOZQivlh4vrVlxGcmuZ7w1ngPzhDhxa_-Y0dd-toZOHeuyIi6bZByob20tW0D5Y_HHLs1cq09TmTd_D-wBkspVKnMLZoEmZQl20ZK6gwFInndXeenuqM2Qwl_CfxhGO7gNw8-aR_aOTUId30qxf3EPLiSz_6h8V4pZqFauWwbEOFvaHtFLjs-l0ecW3qhF9LiB_BJp-B8tVQNACbMuiSrplM28ISmerudst3dks5EFKXM11QFMfyOKT0BEs68ss6G5_Gr9VSMzZ7r1MtE7LEDIeLb-4HRg0zLLxZTklWhVJT3vP4Ri_pb_iP8LdpmFE3FtwK7ByZv0JX8gSQH0KWCZQar2lkFi1Hm4XUgN0j2NZYCVskCbpa5G9d_Hhy3qjv508tupnxR-942MkcDIEdrnnNF2_8SEcdFd8pszfSL1F_S7coQm-2hWbvRn0coWa8QM9wkxYfLENPwThgj7NG1_uZY296M1JR4bage-gqFppcfIePDWdB0Y1qkhOJ8SYT8euyzUf0e30jjT5d_CX1GHBQ8oNKYLOAY3PGucyY4RCdPIhaiQeDcIlQWRFdS1iCkySivJWzhShpG9x9kCXy2N68MkqrH08Ih_6kvXQjECunTFY1iNC2BENsflRWhxcn2T5SuFZo1XLaMWjAtQNT6NC3Tf8Ob9Q4Xbps6HZVY8z2TnZ5RZ2dIJTi4qoMs17-OzMAB3zCuKaZ5R2uKwlh4W6UXZE4oYM9wKrJK1Iksrp3hbjjhngItS4f3hUFyp75lDkFVR-uHvN31W4gEUJDekNFQhp7OM757S3ACT_LvAsSayxmimDQ5TJMXZZWKiEAPn3O13tMrdHBFFzX5Pypbe1PAtU0b8JtDQ76I3iNb5SSNiVDwKTUR3tf_UaDriXpewMu1M6k7bkklJzeITFlk3AnpEm3NuADMbt1mcM62HEdkIM99_JAik4HafqFEuf0_0n4R42Rv9QzK1kzNs33VdgPPMEIAyIesVRM7Ny9Vple229Z_jdi0cGl_39dQ5dkFCvxrRtfMC5W4wKaV7PpgWgc5QxlT_-hu05A_DlofT542_Yf7eIGS0TLWIDQJi3HUgzibvCWu1qLgA9e1LAR3kmHKvrmZSYgyKp73wy9cwFJaOZ4y5ZYMRsJIbdaNzEsI2QQ1a137kHtAqZen9X3ZYaJhgBJ2LQ9t6CJ8w0nJagrwtKnBlNBqYQT6sC-xenj1lwphvLOX1ewJapTm6iL9gke2f7l9Sv9sG-rg4ttVzaDUjLaBdkLjFmUbRTHgUN9EekC5SuBmBAV_DNhO1RL46x0TFTwhBTG9m9gSQmhH_Sq85m8oatN45ISHpfeuIm3tyWjSJQS8zo8r01eZuHf9BqTlIbXvDGaHBTaXVVDq1SIWRgoU12LNGORRPaq-if8ACSPu4kHOGGj8Cw-nquXy9if1rKoMcyYArKRl6-vMxse24p2WNXUyC7HFuKYBaWCnc0_XkN3xRwwvnbTExT7TeaSUux448Dr3oe7pvRtICGFIh3wUTyYSC0iOh11ekGpOK6FnObrAS64Hg9CAOzr6dMCXYK_wkU6hhfB8IhsgKhcwc8YJZ_08vG_MzVgGS3iZvxwxELc3JmqhuOHvw=w1303-h941",
  },
  {
    id: 6,
    name: "PLC Chile",
    imgUrl: "src/assets/plcchile.png",
    link: "https://lh3.googleusercontent.com/fife/APg5EOYNB-M6tQberyOFE-fpnkjjQHhHhn7AoTNwTGU4Xq-cvjOC1xNJ-9Apqh14lTnlXeWHR9ezupHP_QwXkwekwMZYarBmbaHaFHMEBRdefEYmjIUrRIU4eEdss1mMCZ9AYgI9aU_UfZQgRVr-ouok_D60EXcDpoDLxkLnxSLrgQF0S2t7T7BhFYODgpfOxa-ZbBCe4dwBIsOh2JrhhwhZcoCT95eTyfD_O_mIlt0vTXKFscFdxiucFPcS_wd82payENKh_AOObxmSuTNX_6e_IaN4y_09huTMNZcUNJpqoa1ONdmxmCC0ASx0YGSJVbKNGBNLhKFyP6sN1tYKMbblYSOIMFqP6S7hGHBaiVxw4kWS-SVkmxkV4NEBhC26bYm2neHh74DPAKwbZDut6SjqrweyTj9TqK40PPR6D-eRb3S5EZgR_UOcUs5JgCBOfnLTop-hsqNg8RIt1rjzwNRuLheI8-A0sD2y5KMTjr8tJqcWfKs2h9F5lvQ9j-IHkGvFn7gObdf3aymmwrWUINwPpqYceB-S3fwLlbZGyZpG8yliRsvxuMy9AdfSdqIKGbaYjSI2eF077RveMoyF4xVXTYHrzgyUinLRwBUcXeB2LQuZ-0Jyy0b_RNDkcZC0S-5VJDVE1Pwfk926RUnzZtpF-tcYtf4TH7OQEHNp9WDFgG-_kk23OVrI_quupZvTYTY2v9NpLYjJscLXNLQFfwLufDvJpUcCbQI3fHMD8QVme6Ghb45J93CHSVjBtyKoLh0G3zjZsnytDS83YehDEPpEl9GwlNsjaaImXT5xKrvmMAo8nDE7J0nLJvACyKjHvq_ISG40pExGzhWjeOeFDZnfCTMcYL8E1E_mX9qMqfdiWItLaTSJPclzD97fkmbTJ1YUbjYNsQJ2dOUiPxpX8b8xeUoerRrM5pthk788vAZH-MP5pvKtEGJklPfHL_38NPL-wOKoE4sX805dDURiyo0-aFjHBWAK1YT516u5is4XJBQtEmNF6zDKNUi8WuCaeuTp904llOjnTwIqvVx5w5Sggnc4h2hByddKyhWPGjXCavQ40whBl5gWcCc5VtYlDvn-j96wl-ZcemoZmWbf4XM7VtxsxJFIJO-364Bv9SFr040N9UFwhC9m05ul68uTjRhNvUAF-Mup1zP9EieBXQhQTBOETy35aRteNFm8IJxUKCkm32Zbe_Ckq1wuSP7QRDBAUHo4iuOskmXWnLOSxaHYJAqYLa2_zt-A3fU5SwWfjePUmZbi3Qh4dtuYqXi9sKCafBqo4pGFzIZVMmPPgXszjv6gexBohF3VSwnIWYP-5MDgsS_kssQwhX3ZtSLchMWwCi5W_WftUZ9rNHfmuPUPkilNY7t5zoS6xpc_u1WTUOptGUTobi01FoYROPN0eV2EUB4wRAHKZpZBsjiX5QK6FQkwCjJC4U2yqkNMYskbmP6ZRTInfq9BP4Oa6_Z0J_id5q3W_yZiv-XXwBEhng23X-LwJzwxf3UYl7fq7ci0DcOT7l9FG2dAj06SL4QvIbHZOla70TTr3QJbUqwKQuxnInVzsA4gIgyvTMZ05eX2t1NRSkw7Oz4aHWkywCA1tyO0OIYR0Oa4-QkTAOxN1A=w1303-h941",
  },
];

function GridEnterprises({ enterprises }) {
  return (
    <div className="mx-auto grid max-w-6xl place-items-center gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {enterprises.map((enterprise) => (
        <a
          href={enterprise.link}
          className="h-full w-60 text-center shadow-sm "
          key={enterprise.id}
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
