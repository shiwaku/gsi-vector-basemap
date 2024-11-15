// PMTilesのMapLibre GL JS用のプロトコルをグローバルに追加
let protocol = new pmtiles.Protocol();
maplibregl.addProtocol("pmtiles", protocol.tile);

const styles = {
  experimental: "./style/experimental_bvmap/std.json",
  optimal: "./style/optimal_bvmap/std.json",
};

// マップの初期化
const map = new maplibregl.Map({
  container: "map",
  style: styles.experimental, // マップのスタイルを指定
  center: [139.7758, 35.6595], // マップの初期中心点を指定（経度, 緯度）
  zoom: 8.48, // マップの初期ズームレベルを設定
  pitch: 63, // マップの初期ピッチ（傾き）を指定
  maxPitch: 85, // マップの最大ピッチ角度を指定
  bearing: 0, // マップの初期ベアリング（向き）を指定
  hash: true, // URLに地図の状態（中心点座標、ズームレベル、ピッチ、ベアリングなど）を反映させる（地図の状態がURLのハッシュに保存されるため、ページ再読み込み時に同じ状態を保持）
  attributionControl: false, // 著作権表示（アトリビュート）を非表示に設定
});

// ズーム・回転コントロールを追加
map.addControl(new maplibregl.NavigationControl());

// フルスクリーンモードのオンオフ用ボタンを追加
map.addControl(new maplibregl.FullscreenControl());

// 現在位置表示コントロールを追加
map.addControl(
  new maplibregl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: false, // 高精度位置情報を使わない（バッテリー節約のため）
    },
    fitBoundsOptions: { maxZoom: 18 }, // 現在位置にズームインする際の最大ズームレベルを指定
    trackUserLocation: true, // ユーザーが移動すると地図上に位置を追跡する
    showUserLocation: true, // ユーザーの現在位置を地図上に表示する
  })
);

// スケール表示を追加
map.addControl(
  new maplibregl.ScaleControl({
    maxWidth: 200, // スケールバーの最大幅
    unit: "metric", // メートル単位で表示
  })
);

// 著作権情報を折りたたみ表示にする
map.addControl(
  new maplibregl.AttributionControl({
    compact: true, // 著作権情報をコンパクトな形式で表示
  })
);

map.showTileBoundaries = true;

// スタイルを切り替える関数
function switchBaseMap(styleName) {
  if (styles[styleName]) {
    map.setStyle(styles[styleName]);
  }
}

// ラジオボタンにイベントリスナーを追加
document.querySelectorAll('input[name="layer"]').forEach((radio) => {
  radio.addEventListener("change", (event) => {
    switchBaseMap(event.target.value);
  });
});
