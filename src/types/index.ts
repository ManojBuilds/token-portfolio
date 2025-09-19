interface Coin {
  item: {
    id: string;
    coin_id: number;
    name: string;
    symbol: string;
    market_cap_rank: 530;
    thumb: string;
    slug: string;
    data: {
      price: number;
      price_change_percentage_24h: {
        aed: -4.04467447608756;
        ars: -4.04990008945855;
        aud: -4.04990008945802;
        bch: -2.37567962487489;
        bdt: -4.0499000894585;
        bhd: -4.16927013396437;
        bmd: -4.04990008945853;
        bnb: -3.4734695990217;
        brl: -4.04990008945847;
        btc: -5.98585375059246;
        cad: -4.04990008945848;
        chf: -4.04990008945855;
        clp: -5.02567556756719;
        cny: -4.0499000894584;
        czk: -4.04990008945864;
        dkk: -4.04990008945864;
        dot: -5.98238779521245;
        eos: -5.74405098071799;
        eth: -5.05689445119971;
        eur: -4.09661619752604;
        gbp: -4.04990008945847;
        gel: -4.04990008945897;
        hkd: -4.04990008945852;
        huf: -4.05387716450818;
        idr: -4.04990008945821;
        ils: -4.40922021210977;
        inr: -4.04990008945856;
        jpy: -4.04990008945905;
        krw: -4.04990008945847;
        kwd: -4.12041469685036;
        lkr: -4.0499000894589;
        ltc: -5.29341338838337;
        mmk: -4.04990008945877;
        mxn: -4.0499000894592;
        myr: -4.04990008945872;
        ngn: -4.04990008945849;
        nok: -4.04990008945854;
        nzd: -4.0499000894586;
        php: -4.04990008945844;
        pkr: -4.04990008945845;
        pln: -4.04990008945856;
        rub: -4.04990008945847;
        sar: -4.04990008945841;
        sek: -4.04990008945854;
        sgd: -4.04990008945858;
        sol: -4.04990008945847;
        thb: -4.04105687070854;
        try: -4.04990008945837;
        twd: -4.04990008945847;
        uah: -4.17945939929411;
        usd: -4.04990008945853;
        vef: -4.0499000894584;
        vnd: -4.04990008945868;
        xag: -4.06208301025163;
        xau: -4.04990008945842;
        xdr: -4.04990008945852;
        xlm: -4.12493924900392;
        xrp: -4.48127069993476;
        yfi: -4.04427366181248;
        zar: -4.0499000894588;
        bits: -5.98585375059245;
        link: -5.12005806599531;
        sats: -5.98585375059245;
      };
      market_cap: string;
      market_cap_btc: string;
      total_volume: string;
      total_volume_btc: string;
      sparkline: string;
    };
  };
}
export interface TrendingData {
  coins: Coin[];
}

export interface Token {
  id: string;
  thumb: string;
  name: string;
  symbol: string;
  price: number;
  price_change_percentage_24h: number;
  sparkline_in_7d: number[];
  holdings: number;
  value: number;
}

export interface SearchResult {
  coins: Token[];
}

declare module "@tanstack/react-table" {
  interface TableMeta<TData> {
    editingRowId: string | null;
    setEditingRowId: (id: string | null) => void;
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}
