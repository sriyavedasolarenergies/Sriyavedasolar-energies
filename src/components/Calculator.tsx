import React, { useState, useEffect } from 'react';
import { Calculator as CalcIcon, Zap, Home, TrendingUp, Download, ArrowRight, MapPin, X, Search } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface CalculationResult {
  systemSize: number;
  totalCost: number;
  monthlyBill: number;
  monthlySavings: number;
  yearlySavings: number;
  paybackPeriod: number;
  carbonOffset: number;
}

interface LocationData {
  name: string;
  lat: number;
  lng: number;
  sunHours: number;
}

const Calculator = () => {
  const [monthlyBill, setMonthlyBill] = useState<number>(3000);
  const [roofArea, setRoofArea] = useState<number>(500);
  const [location, setLocation] = useState<string>('Palakollu');
  const [locationData, setLocationData] = useState<LocationData>({ name: 'Palakollu', lat: 16.5167, lng: 81.7333, sunHours: 5.2 });
  const [systemType, setSystemType] = useState<string>('grid-tie');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [showMapModal, setShowMapModal] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredLocations, setFilteredLocations] = useState<LocationData[]>([]);

  const locations = [
    // Coastal Andhra Pradesh
    { name: 'Visakhapatnam', lat: 17.6868, lng: 83.2185, sunHours: 5.8 },
    { name: 'Vijayawada', lat: 16.5062, lng: 80.6480, sunHours: 5.6 },
    { name: 'Guntur', lat: 16.3067, lng: 80.4365, sunHours: 5.5 },
    { name: 'Nellore', lat: 14.4426, lng: 79.9865, sunHours: 5.7 },
    { name: 'Tirupati', lat: 13.6288, lng: 79.4192, sunHours: 5.9 },
    { name: 'Kakinada', lat: 16.9891, lng: 82.2475, sunHours: 5.3 },
    { name: 'Rajahmundry', lat: 17.0005, lng: 81.8040, sunHours: 5.4 },
    { name: 'Machilipatnam', lat: 16.1905, lng: 81.1362, sunHours: 5.2 },
    { name: 'Ongole', lat: 15.5057, lng: 80.0499, sunHours: 5.6 },
    { name: 'Chirala', lat: 15.8238, lng: 80.3521, sunHours: 5.5 },
    { name: 'Bapatla', lat: 15.9042, lng: 80.4679, sunHours: 5.4 },
    { name: 'Tenali', lat: 16.2420, lng: 80.6400, sunHours: 5.4 },
    { name: 'Ponnur', lat: 16.0711, lng: 80.5520, sunHours: 5.3 },
    { name: 'Piduguralla', lat: 16.4800, lng: 79.8700, sunHours: 5.5 },
    { name: 'Narasaraopet', lat: 16.2350, lng: 80.0470, sunHours: 5.4 },
    { name: 'Chilakaluripet', lat: 16.0892, lng: 80.1672, sunHours: 5.3 },
    { name: 'Sattenapalle', lat: 16.3940, lng: 80.1520, sunHours: 5.4 },
    { name: 'Vinukonda', lat: 16.0500, lng: 79.7400, sunHours: 5.5 },
    { name: 'Nandigama', lat: 16.7833, lng: 80.2833, sunHours: 5.3 },
    { name: 'Jaggayyapeta', lat: 16.9000, lng: 80.1000, sunHours: 5.4 },
    { name: 'Khammam', lat: 17.2473, lng: 80.1514, sunHours: 5.5 },
    { name: 'Srikakulam', lat: 18.2969, lng: 83.8968, sunHours: 5.7 },
    { name: 'Parvathipuram', lat: 18.7833, lng: 83.4167, sunHours: 5.6 },
    { name: 'Palakonda', lat: 18.6000, lng: 83.7500, sunHours: 5.5 },
    { name: 'Amadalavalasa', lat: 18.4167, lng: 83.9000, sunHours: 5.4 },
    { name: 'Tekkali', lat: 18.6167, lng: 84.2333, sunHours: 5.3 },
    { name: 'Palasa', lat: 18.7726, lng: 84.4100, sunHours: 5.2 },
    { name: 'Ichchapuram', lat: 19.1167, lng: 84.6833, sunHours: 5.1 },
    { name: 'Sompeta', lat: 18.9333, lng: 84.6000, sunHours: 5.0 },
    { name: 'Kavali', lat: 14.9167, lng: 79.9833, sunHours: 5.8 },
    { name: 'Gudur', lat: 14.1500, lng: 79.8500, sunHours: 5.9 },
    { name: 'Naidupet', lat: 14.2333, lng: 79.8833, sunHours: 5.7 },
    { name: 'Sullurpeta', lat: 13.7000, lng: 80.0167, sunHours: 5.8 },
    { name: 'Venkatagiri', lat: 13.9667, lng: 79.5833, sunHours: 5.9 },
    { name: 'Udayagiri', lat: 14.8667, lng: 79.3167, sunHours: 5.8 },
    { name: 'Badvel', lat: 14.7333, lng: 79.0667, sunHours: 5.7 },
    { name: 'Rajampet', lat: 14.1833, lng: 79.1500, sunHours: 5.8 },
    { name: 'Kadapa', lat: 14.4673, lng: 78.8242, sunHours: 6.0 },
    { name: 'Proddatur', lat: 14.7500, lng: 78.5500, sunHours: 5.9 },
    { name: 'Jammalamadugu', lat: 14.8500, lng: 78.3833, sunHours: 5.8 },
    { name: 'Pulivendla', lat: 14.4167, lng: 78.2333, sunHours: 5.9 },
    { name: 'Mydukur', lat: 14.6833, lng: 78.7667, sunHours: 5.8 },
    { name: 'Yerraguntla', lat: 14.6333, lng: 78.5333, sunHours: 5.9 },
    { name: 'Kadiri', lat: 14.1167, lng: 78.1667, sunHours: 5.8 },
    { name: 'Dharmavaram', lat: 14.4167, lng: 77.7167, sunHours: 5.9 },
    { name: 'Tadipatri', lat: 14.9167, lng: 78.0167, sunHours: 5.8 },
    { name: 'Hindupur', lat: 13.8167, lng: 77.5000, sunHours: 5.9 },
    { name: 'Guntakal', lat: 15.1667, lng: 77.3833, sunHours: 5.7 },
    { name: 'Adoni', lat: 15.6333, lng: 77.2833, sunHours: 5.8 },
    { name: 'Mantralayam', lat: 15.9333, lng: 77.4333, sunHours: 5.7 },
    { name: 'Raichur', lat: 16.2000, lng: 77.3500, sunHours: 5.6 },
    { name: 'Kurnool', lat: 15.8281, lng: 78.0373, sunHours: 5.8 },
    { name: 'Nandyal', lat: 15.4833, lng: 78.4833, sunHours: 5.7 },
    { name: 'Allagadda', lat: 15.1333, lng: 78.5167, sunHours: 5.6 },
    { name: 'Srisailam', lat: 16.0833, lng: 78.8667, sunHours: 5.5 },
    { name: 'Markapur', lat: 15.7333, lng: 79.2833, sunHours: 5.4 },
    { name: 'Cumbum', lat: 15.5833, lng: 79.1167, sunHours: 5.5 },
    { name: 'Giddalur', lat: 15.3833, lng: 78.9333, sunHours: 5.6 },
    { name: 'Dhone', lat: 15.4167, lng: 77.8667, sunHours: 5.7 },
    { name: 'Pattikonda', lat: 15.4000, lng: 77.5000, sunHours: 5.8 },
    { name: 'Yemmiganur', lat: 15.7667, lng: 77.4833, sunHours: 5.7 },
    { name: 'Sirvella', lat: 15.2833, lng: 77.6500, sunHours: 5.8 },
    { name: 'Atmakur', lat: 15.8833, lng: 78.5833, sunHours: 5.6 },
    { name: 'Koilkuntla', lat: 15.2333, lng: 78.3167, sunHours: 5.7 },
    { name: 'Wanaparthy', lat: 16.3667, lng: 78.0667, sunHours: 5.5 },
    { name: 'Gadwal', lat: 16.2333, lng: 77.8000, sunHours: 5.6 },
    { name: 'Alampur', lat: 15.8833, lng: 78.1333, sunHours: 5.5 },
    { name: 'Mahabubnagar', lat: 16.7438, lng: 77.9867, sunHours: 5.4 },
    { name: 'Jadcherla', lat: 16.7667, lng: 78.1333, sunHours: 5.3 },
    { name: 'Shadnagar', lat: 17.0667, lng: 78.2000, sunHours: 5.2 },
    { name: 'Kalwakurthy', lat: 16.6500, lng: 78.4833, sunHours: 5.3 },
    { name: 'Nagarkurnool', lat: 16.4833, lng: 78.3167, sunHours: 5.4 },
    { name: 'Achampet', lat: 16.6333, lng: 78.1333, sunHours: 5.3 },
    { name: 'Ghanpur', lat: 17.8500, lng: 80.5500, sunHours: 5.2 },
    { name: 'Wyra', lat: 17.2167, lng: 80.2833, sunHours: 5.3 },
    { name: 'Sathupalli', lat: 17.2500, lng: 80.8667, sunHours: 5.2 },
    { name: 'Yellandu', lat: 17.6000, lng: 80.3333, sunHours: 5.1 },
    { name: 'Manuguru', lat: 17.9333, lng: 80.8167, sunHours: 5.0 },
    { name: 'Bhadrachalam', lat: 17.6667, lng: 80.8833, sunHours: 4.9 },
    { name: 'Kothagudem', lat: 17.5500, lng: 80.6167, sunHours: 5.0 },
    { name: 'Palwancha', lat: 17.6000, lng: 80.6833, sunHours: 5.1 },
    { name: 'Yellandu', lat: 17.6000, lng: 80.3333, sunHours: 5.1 },
    { name: 'Bhongir', lat: 17.5167, lng: 78.8833, sunHours: 5.2 },
    { name: 'Jangaon', lat: 17.7167, lng: 79.1833, sunHours: 5.1 },
    { name: 'Warangal', lat: 17.9689, lng: 79.5941, sunHours: 5.0 },
    { name: 'Nalgonda', lat: 17.0500, lng: 79.2667, sunHours: 5.1 },
    { name: 'Miryalaguda', lat: 16.8667, lng: 79.5667, sunHours: 5.2 },
    { name: 'Suryapet', lat: 17.1333, lng: 79.6333, sunHours: 5.1 },
    { name: 'Kodad', lat: 16.9833, lng: 79.9667, sunHours: 5.2 },
    { name: 'Nagarjuna Sagar', lat: 16.5833, lng: 79.3167, sunHours: 5.3 },
    { name: 'Devarakonda', lat: 16.6833, lng: 78.9333, sunHours: 5.4 },
    { name: 'Huzurabad', lat: 18.2000, lng: 79.4167, sunHours: 4.9 },
    { name: 'Karimnagar', lat: 18.4386, lng: 79.1288, sunHours: 4.8 },
    { name: 'Siddipet', lat: 18.1000, lng: 78.8500, sunHours: 5.0 },
    { name: 'Medak', lat: 18.0500, lng: 78.2667, sunHours: 5.1 },
    { name: 'Sangareddy', lat: 17.6167, lng: 78.0833, sunHours: 5.2 },
    { name: 'Hyderabad', lat: 17.3850, lng: 78.4867, sunHours: 5.3 },
    { name: 'Secunderabad', lat: 17.4399, lng: 78.4983, sunHours: 5.3 },
    { name: 'Malkajgiri', lat: 17.4500, lng: 78.5333, sunHours: 5.2 },
    { name: 'Quthbullapur', lat: 17.5000, lng: 78.4667, sunHours: 5.2 },
    { name: 'Kukatpally', lat: 17.4833, lng: 78.4167, sunHours: 5.2 },
    { name: 'Serilingampally', lat: 17.4833, lng: 78.3167, sunHours: 5.2 },
    { name: 'Ameerpet', lat: 17.4333, lng: 78.4500, sunHours: 5.2 },
    { name: 'Begumpet', lat: 17.4333, lng: 78.4667, sunHours: 5.2 },
    { name: 'Jubilee Hills', lat: 17.4333, lng: 78.4000, sunHours: 5.2 },
    { name: 'Banjara Hills', lat: 17.4167, lng: 78.4333, sunHours: 5.2 },
    { name: 'Himayatnagar', lat: 17.4000, lng: 78.4833, sunHours: 5.2 },
    { name: 'Abids', lat: 17.3833, lng: 78.4833, sunHours: 5.2 },
    { name: 'Nampally', lat: 17.3833, lng: 78.4667, sunHours: 5.2 },
    { name: 'Charminar', lat: 17.3617, lng: 78.4747, sunHours: 5.2 },
    { name: 'Mehdipatnam', lat: 17.3833, lng: 78.4333, sunHours: 5.2 },
    { name: 'Gachibowli', lat: 17.4400, lng: 78.3483, sunHours: 5.2 },
    { name: 'Hitech City', lat: 17.4435, lng: 78.3772, sunHours: 5.2 },
    { name: 'Kondapur', lat: 17.4667, lng: 78.3667, sunHours: 5.2 },
    { name: 'Madhapur', lat: 17.4500, lng: 78.3833, sunHours: 5.2 },
    { name: 'Manikonda', lat: 17.4000, lng: 78.3833, sunHours: 5.2 },
    { name: 'Nallagandla', lat: 17.4667, lng: 78.3000, sunHours: 5.2 },
    { name: 'Tellapur', lat: 17.4500, lng: 78.2833, sunHours: 5.2 },
    { name: 'Shamshabad', lat: 17.2500, lng: 78.4000, sunHours: 5.2 },
    { name: 'Rajendranagar', lat: 17.3167, lng: 78.4000, sunHours: 5.2 },
    { name: 'Uppal', lat: 17.4000, lng: 78.5500, sunHours: 5.2 },
    { name: 'Habsiguda', lat: 17.4167, lng: 78.5167, sunHours: 5.2 },
    { name: 'Asifnagar', lat: 17.3833, lng: 78.4667, sunHours: 5.2 },
    { name: 'Vijayanagar Colony', lat: 17.4167, lng: 78.4833, sunHours: 5.2 },
    { name: 'Langer Houz', lat: 17.3333, lng: 78.3833, sunHours: 5.2 },
    { name: 'Saroornagar', lat: 17.3500, lng: 78.5333, sunHours: 5.2 },
    { name: 'Kothapet', lat: 17.3667, lng: 78.5167, sunHours: 5.2 },
    { name: 'Chandrayangutta', lat: 17.3167, lng: 78.5167, sunHours: 5.2 },
    { name: 'Falaknuma', lat: 17.3333, lng: 78.4667, sunHours: 5.2 },
    { name: 'Old Malakpet', lat: 17.3667, lng: 78.4833, sunHours: 5.2 },
    { name: 'Saidabad', lat: 17.3500, lng: 78.4833, sunHours: 5.2 },
    { name: 'Santoshnagar', lat: 17.3667, lng: 78.5167, sunHours: 5.2 },
    { name: 'Malkajgiri', lat: 17.4500, lng: 78.5333, sunHours: 5.2 },
    { name: 'Neredmet', lat: 17.4833, lng: 78.5333, sunHours: 5.2 },
    { name: 'Vinayak Nagar', lat: 17.4833, lng: 78.5167, sunHours: 5.2 },
    { name: 'Moula Ali', lat: 17.4667, lng: 78.5667, sunHours: 5.2 },
    { name: 'Ghatkesar', lat: 17.4500, lng: 78.6833, sunHours: 5.1 },
    { name: 'Uppal Kalan', lat: 17.4000, lng: 78.5667, sunHours: 5.2 },
    { name: 'Medchal', lat: 17.6333, lng: 78.4833, sunHours: 5.1 },
    { name: 'Dundigal', lat: 17.5500, lng: 78.4167, sunHours: 5.1 },
    { name: 'Kompally', lat: 17.5333, lng: 78.4833, sunHours: 5.1 },
    { name: 'Jeedimetla', lat: 17.5167, lng: 78.4500, sunHours: 5.1 },
    { name: 'Suchitra', lat: 17.5167, lng: 78.4333, sunHours: 5.1 },
    { name: 'Alwal', lat: 17.5000, lng: 78.5000, sunHours: 5.1 },
    { name: 'Bowenpally', lat: 17.4667, lng: 78.4833, sunHours: 5.1 },
    { name: 'Balanagar', lat: 17.4667, lng: 78.4500, sunHours: 5.1 },
    { name: 'Moosapet', lat: 17.4667, lng: 78.4167, sunHours: 5.1 },
    { name: 'Erragadda', lat: 17.4500, lng: 78.4333, sunHours: 5.1 },
    { name: 'Barkatpura', lat: 17.3833, lng: 78.4833, sunHours: 5.2 },
    { name: 'Nallakunta', lat: 17.4000, lng: 78.5000, sunHours: 5.2 },
    { name: 'Goshamahal', lat: 17.3833, lng: 78.4833, sunHours: 5.2 },
    { name: 'Musheerabad', lat: 17.4167, lng: 78.5000, sunHours: 5.2 },
    { name: 'Ram Nagar', lat: 17.4000, lng: 78.4833, sunHours: 5.2 },
    { name: 'Bholakpur', lat: 17.3833, lng: 78.4833, sunHours: 5.2 },
    { name: 'Marredpally', lat: 17.4333, lng: 78.5000, sunHours: 5.2 },
    { name: 'East Marredpally', lat: 17.4333, lng: 78.5167, sunHours: 5.2 },
    { name: 'West Marredpally', lat: 17.4333, lng: 78.4833, sunHours: 5.2 },
    { name: 'Secunderabad Cantonment', lat: 17.4333, lng: 78.5000, sunHours: 5.2 },
    { name: 'Trimulgherry', lat: 17.4667, lng: 78.5167, sunHours: 5.2 },
    { name: 'Karkhana', lat: 17.4500, lng: 78.5167, sunHours: 5.2 },
    { name: 'Raniganj', lat: 17.4333, lng: 78.5167, sunHours: 5.2 },
    { name: 'Begumpet Airport', lat: 17.4500, lng: 78.4667, sunHours: 5.2 },
    { name: 'Shamshabad Airport', lat: 17.2333, lng: 78.4333, sunHours: 5.2 },
    { name: 'Anantapur', lat: 14.6819, lng: 77.6006, sunHours: 5.8 },
    { name: 'Chittoor', lat: 13.2172, lng: 79.1003, sunHours: 5.9 },
    { name: 'Eluru', lat: 16.7107, lng: 81.0952, sunHours: 5.3 },
    { name: 'Nizamabad', lat: 18.6725, lng: 78.0941, sunHours: 5.0 },
    { name: 'Adilabad', lat: 19.6720, lng: 78.5310, sunHours: 4.7 },
    { name: 'Karimnagar', lat: 18.4386, lng: 79.1288, sunHours: 4.8 },
    { name: 'Ramagundam', lat: 18.7550, lng: 79.4740, sunHours: 4.9 },
    { name: 'Khammam', lat: 17.2473, lng: 80.1514, sunHours: 5.5 },
    { name: 'Mahbubnagar', lat: 16.7438, lng: 77.9867, sunHours: 5.4 },
    { name: 'Nalgonda', lat: 17.0500, lng: 79.2667, sunHours: 5.1 },
    { name: 'Warangal', lat: 17.9689, lng: 79.5941, sunHours: 5.0 },
    { name: 'Srikakulam', lat: 18.2969, lng: 83.8968, sunHours: 5.7 },
    { name: 'Vizianagaram', lat: 18.1067, lng: 83.3956, sunHours: 5.6 },
    { name: 'East Godavari', lat: 17.0005, lng: 81.8040, sunHours: 5.4 },
    { name: 'West Godavari', lat: 16.7107, lng: 81.0952, sunHours: 5.3 },
    { name: 'Krishna', lat: 16.5062, lng: 80.6480, sunHours: 5.6 },
    { name: 'Guntur', lat: 16.3067, lng: 80.4365, sunHours: 5.5 },
    { name: 'Prakasam', lat: 15.5057, lng: 80.0499, sunHours: 5.6 },
    { name: 'Nellore', lat: 14.4426, lng: 79.9865, sunHours: 5.7 },
    { name: 'Chittoor', lat: 13.2172, lng: 79.1003, sunHours: 5.9 },
    { name: 'Kadapa', lat: 14.4673, lng: 78.8242, sunHours: 6.0 },
    { name: 'Anantapur', lat: 14.6819, lng: 77.6006, sunHours: 5.8 },
    { name: 'Kurnool', lat: 15.8281, lng: 78.0373, sunHours: 5.8 },
    { name: 'Mahbubnagar', lat: 16.7438, lng: 77.9867, sunHours: 5.4 },
    { name: 'Ranga Reddy', lat: 17.3850, lng: 78.4867, sunHours: 5.3 },
    { name: 'Hyderabad', lat: 17.3850, lng: 78.4867, sunHours: 5.3 },
    { name: 'Medak', lat: 18.0500, lng: 78.2667, sunHours: 5.1 },
    { name: 'Nizamabad', lat: 18.6725, lng: 78.0941, sunHours: 5.0 },
    { name: 'Adilabad', lat: 19.6720, lng: 78.5310, sunHours: 4.7 },
    { name: 'Karimnagar', lat: 18.4386, lng: 79.1288, sunHours: 4.8 },
    { name: 'Warangal', lat: 17.9689, lng: 79.5941, sunHours: 5.0 },
    { name: 'Khammam', lat: 17.2473, lng: 80.1514, sunHours: 5.5 },
    { name: 'Nalgonda', lat: 17.0500, lng: 79.2667, sunHours: 5.1 },
    { name: 'Palakollu', lat: 16.5167, lng: 81.7333, sunHours: 5.2 },
    { name: 'Mogalathuru', lat: 16.2833, lng: 81.2833, sunHours: 5.5 },
    { name: 'Bhimavaram', lat: 16.5333, lng: 81.5167, sunHours: 5.1 },
    { name: 'Gokavaram', lat: 17.2833, lng: 81.8833, sunHours: 5.8 },
    { name: 'Tenali', lat: 16.2333, lng: 80.6167, sunHours: 5.4 },
    { name: 'Jangareddygudem', lat: 16.7833, lng: 81.8333, sunHours: 5.3 },
    // Additional Villages, Towns and Cities in Andhra Pradesh
    { name: 'Tadepalligudem', lat: 16.8138, lng: 81.5212, sunHours: 5.2 },
    { name: 'Nidadavole', lat: 16.9058, lng: 81.6716, sunHours: 5.3 },
    { name: 'Tanuku', lat: 16.7544, lng: 81.6914, sunHours: 5.2 },
    { name: 'Attili', lat: 16.7000, lng: 81.6000, sunHours: 5.2 },
    { name: 'Penugonda', lat: 16.6500, lng: 81.7333, sunHours: 5.2 },
    { name: 'Akividu', lat: 16.5833, lng: 81.3833, sunHours: 5.1 },
    { name: 'Undi', lat: 16.5167, lng: 81.4833, sunHours: 5.1 },
    { name: 'Penumantra', lat: 16.4833, lng: 81.4333, sunHours: 5.1 },
    { name: 'Iragavaram', lat: 16.6833, lng: 81.8833, sunHours: 5.3 },
    { name: 'Devarapalle', lat: 16.4833, lng: 81.5333, sunHours: 5.1 },
    { name: 'Polavaram', lat: 17.2500, lng: 81.6500, sunHours: 5.4 },
    { name: 'Chintalapudi', lat: 17.0833, lng: 80.9667, sunHours: 5.3 },
    { name: 'Jeelugumilli', lat: 17.1333, lng: 81.0833, sunHours: 5.3 },
    { name: 'Buttaigudem', lat: 17.2833, lng: 81.0833, sunHours: 5.4 },
    { name: 'Aswaraopeta', lat: 17.2333, lng: 81.1167, sunHours: 5.4 },
    { name: 'Kukkunoor', lat: 17.2833, lng: 81.2167, sunHours: 5.4 },
    { name: 'Rajanagaram', lat: 17.0833, lng: 81.9000, sunHours: 5.4 },
    { name: 'Mandapeta', lat: 16.8667, lng: 81.9333, sunHours: 5.3 },
    { name: 'Anaparthy', lat: 16.9500, lng: 81.9167, sunHours: 5.3 },
    { name: 'Biccavolu', lat: 16.9500, lng: 82.0833, sunHours: 5.3 },
    { name: 'Jaggampeta', lat: 17.1833, lng: 82.0667, sunHours: 5.4 },
    { name: 'Gandepalle', lat: 17.2833, lng: 82.0833, sunHours: 5.4 },
    { name: 'Kothapalle', lat: 17.3667, lng: 82.2833, sunHours: 5.5 },
    { name: 'Devipatnam', lat: 17.2833, lng: 82.1667, sunHours: 5.4 },
    { name: 'Yeleswaram', lat: 17.2833, lng: 82.1167, sunHours: 5.4 },
    { name: 'Pithapuram', lat: 17.1167, lng: 82.2500, sunHours: 5.4 },
    { name: 'Samarlakota', lat: 17.0667, lng: 82.1833, sunHours: 5.4 },
    { name: 'Peddapuram', lat: 17.0833, lng: 82.1333, sunHours: 5.4 },
    { name: 'Tuni', lat: 17.3500, lng: 82.5500, sunHours: 5.5 },
    { name: 'Etikoppaka', lat: 17.5000, lng: 82.7167, sunHours: 5.6 },
    { name: 'Annavaram', lat: 17.2833, lng: 82.4000, sunHours: 5.5 },
    { name: 'Paderu', lat: 18.0833, lng: 82.6667, sunHours: 5.7 },
    { name: 'Munchingi Puttu', lat: 18.2833, lng: 82.8667, sunHours: 5.7 },
    { name: 'Araku Valley', lat: 18.3333, lng: 82.8667, sunHours: 5.7 },
    { name: 'Chintapalle', lat: 18.0667, lng: 82.1667, sunHours: 5.6 },
    { name: 'Gudem Kothaveedhi', lat: 17.7833, lng: 81.8833, sunHours: 5.5 },
    { name: 'Rampachodavaram', lat: 17.4333, lng: 81.7833, sunHours: 5.4 },
    { name: 'Maredumilli', lat: 17.5833, lng: 81.8833, sunHours: 5.5 },
    { name: 'Addateegala', lat: 17.6167, lng: 81.8167, sunHours: 5.5 },
    { name: 'Rajavommangi', lat: 17.5333, lng: 81.8333, sunHours: 5.5 },
    { name: 'Kunavaram', lat: 17.4833, lng: 81.7833, sunHours: 5.4 },
    { name: 'Vararamachandrapuram', lat: 17.4833, lng: 81.7833, sunHours: 5.4 },
    { name: 'Y. Ramavaram', lat: 17.6833, lng: 81.8833, sunHours: 5.5 },
    { name: 'G.K.Veedhi', lat: 17.7833, lng: 81.8833, sunHours: 5.5 },
    { name: 'Nellipaka', lat: 17.7833, lng: 80.8833, sunHours: 5.4 },
    { name: 'Chinturu', lat: 17.8833, lng: 80.8833, sunHours: 5.4 },
    { name: 'Tadvai', lat: 17.8167, lng: 80.8833, sunHours: 5.4 },
    { name: 'Burgampahad', lat: 17.8167, lng: 80.8833, sunHours: 5.4 },
    { name: 'Mulakalapalle', lat: 17.8167, lng: 80.8833, sunHours: 5.4 },
    { name: 'Gundala', lat: 17.7833, lng: 80.8833, sunHours: 5.4 },
    { name: 'Asifabad', lat: 19.3667, lng: 79.2833, sunHours: 4.8 },
    { name: 'Sirpur', lat: 19.4833, lng: 79.1833, sunHours: 4.8 },
    { name: 'Jainoor', lat: 19.2833, lng: 79.0167, sunHours: 4.8 },
    { name: 'Rebbana', lat: 19.2833, lng: 79.0833, sunHours: 4.8 },
    { name: 'Kagaznagar', lat: 19.3333, lng: 79.4667, sunHours: 4.8 },
    { name: 'Sirpur (T)', lat: 19.4833, lng: 79.1833, sunHours: 4.8 },
    { name: 'Tiryani', lat: 19.2833, lng: 79.1167, sunHours: 4.8 },
    { name: 'Kerameri', lat: 19.2833, lng: 79.0833, sunHours: 4.8 },
    { name: 'Wankidi', lat: 19.2833, lng: 79.0833, sunHours: 4.8 },
    { name: 'Dahegaon', lat: 19.2833, lng: 79.0833, sunHours: 4.8 },
    { name: 'Nennel', lat: 19.2833, lng: 79.0833, sunHours: 4.8 },
    { name: 'Soan', lat: 19.2833, lng: 79.0833, sunHours: 4.8 },
    { name: 'Kouthala', lat: 19.2833, lng: 79.0833, sunHours: 4.8 },
    { name: 'Penchikalpet', lat: 19.2833, lng: 79.0833, sunHours: 4.8 },
    { name: 'Laxmanchanda', lat: 19.2833, lng: 79.0833, sunHours: 4.8 },
    { name: 'Bejjur', lat: 19.2833, lng: 79.0833, sunHours: 4.8 },
    { name: 'Vemanpalle', lat: 19.2833, lng: 79.0833, sunHours: 4.8 },
    { name: 'Gannavaram', lat: 16.5333, lng: 80.8000, sunHours: 5.3 },
    { name: 'Vuyyuru', lat: 16.3667, lng: 80.8500, sunHours: 5.3 },
    { name: 'Pamarru', lat: 16.3333, lng: 80.9667, sunHours: 5.3 },
    { name: 'Pedana', lat: 16.2500, lng: 81.1500, sunHours: 5.2 },
    { name: 'Avanigadda', lat: 16.0167, lng: 80.9167, sunHours: 5.2 },
    { name: 'Mopidevi', lat: 16.0833, lng: 80.8833, sunHours: 5.2 },
    { name: 'Nagayalanka', lat: 16.0167, lng: 80.8833, sunHours: 5.2 },
    { name: 'Repalle', lat: 16.0167, lng: 80.8500, sunHours: 5.2 },
    { name: 'Nuzvid', lat: 16.7833, lng: 80.8500, sunHours: 5.3 },
    { name: 'Gudivada', lat: 16.4333, lng: 80.9833, sunHours: 5.3 },
    { name: 'Gudlavalleru', lat: 16.3500, lng: 81.0500, sunHours: 5.3 },
    { name: 'Kanchikacherla', lat: 16.5167, lng: 80.8833, sunHours: 5.3 },
    { name: 'Vijayawada Rural', lat: 16.5167, lng: 80.6167, sunHours: 5.4 },
    { name: 'Ibrahimpatnam', lat: 16.5833, lng: 80.7167, sunHours: 5.3 },
    { name: 'Kankipadu', lat: 16.4500, lng: 80.7833, sunHours: 5.3 },
    { name: 'Penamaluru', lat: 16.4667, lng: 80.7167, sunHours: 5.3 },
    { name: 'Vijayawada (Rural)', lat: 16.5167, lng: 80.6167, sunHours: 5.4 },
    { name: 'G. Konduru', lat: 16.6167, lng: 80.5333, sunHours: 5.4 },
    { name: 'Tadepalle', lat: 16.4833, lng: 80.6000, sunHours: 5.4 },
    { name: 'Mangalagiri', lat: 16.4333, lng: 80.5500, sunHours: 5.4 },
    { name: 'Duggirala', lat: 16.3000, lng: 80.6167, sunHours: 5.4 },
    { name: 'Thullur', lat: 16.7167, lng: 80.1167, sunHours: 5.4 },
    { name: 'Ponnur', lat: 16.0667, lng: 80.5500, sunHours: 5.3 },
    { name: 'Bapatla', lat: 15.9000, lng: 80.4667, sunHours: 5.4 },
    { name: 'Karlapalem', lat: 15.9333, lng: 80.5333, sunHours: 5.4 },
    { name: 'Karamchedu', lat: 15.8833, lng: 80.4833, sunHours: 5.4 },
    { name: 'Martur', lat: 15.8833, lng: 80.4833, sunHours: 5.4 },
    { name: 'Vemuru', lat: 15.8500, lng: 80.7167, sunHours: 5.4 },
    { name: 'Tsundur', lat: 16.1167, lng: 80.6167, sunHours: 5.4 },
    { name: 'Amruthalur', lat: 16.1167, lng: 80.6167, sunHours: 5.4 },
    { name: 'Chebrolu', lat: 16.1167, lng: 80.6167, sunHours: 5.4 },
    { name: 'Addanki', lat: 15.8167, lng: 79.9833, sunHours: 5.5 },
    { name: 'Darsi', lat: 15.7667, lng: 79.6833, sunHours: 5.5 },
    { name: 'Korisapadu', lat: 15.7667, lng: 79.6833, sunHours: 5.5 },
    { name: 'Santhamaguluru', lat: 15.7667, lng: 79.6833, sunHours: 5.5 },
    { name: 'Parchur', lat: 15.9667, lng: 80.0333, sunHours: 5.5 },
    { name: 'Yerragondapalem', lat: 15.9667, lng: 80.0333, sunHours: 5.5 },
    { name: 'Martur', lat: 15.8833, lng: 80.4833, sunHours: 5.4 },
    { name: 'Tarlupadu', lat: 15.8833, lng: 80.4833, sunHours: 5.4 },
    { name: 'Karamchedu', lat: 15.8833, lng: 80.4833, sunHours: 5.4 },
    { name: 'Inkollu', lat: 15.8333, lng: 80.1833, sunHours: 5.5 },
    { name: 'Chimakurthy', lat: 15.5833, lng: 80.0667, sunHours: 5.5 },
    { name: 'Cumbum', lat: 15.5833, lng: 79.1167, sunHours: 5.5 },
    { name: 'Giddalur', lat: 15.3833, lng: 78.9333, sunHours: 5.6 },
    { name: 'Dachepalle', lat: 16.6167, lng: 79.8167, sunHours: 5.5 },
    { name: 'Piduguralla', lat: 16.4833, lng: 79.8667, sunHours: 5.5 },
    { name: 'Sattenapalle', lat: 16.4000, lng: 80.1500, sunHours: 5.4 },
    { name: 'Rajupalem', lat: 16.4000, lng: 80.1500, sunHours: 5.4 },
    { name: 'Kollur', lat: 16.4833, lng: 80.7833, sunHours: 5.3 },
    { name: 'Vemsoor', lat: 16.4833, lng: 80.7833, sunHours: 5.3 },
    { name: 'Challapalle', lat: 16.1167, lng: 80.9333, sunHours: 5.3 },
    { name: 'Bhattiprolu', lat: 16.1000, lng: 80.7833, sunHours: 5.3 },
    { name: 'Muppalla', lat: 16.1000, lng: 80.7833, sunHours: 5.3 },
    { name: 'Tsundur', lat: 16.1167, lng: 80.6167, sunHours: 5.4 },
    { name: 'Amruthalur', lat: 16.1167, lng: 80.6167, sunHours: 5.4 },
    { name: 'Chebrolu', lat: 16.1167, lng: 80.6167, sunHours: 5.4 },
    { name: 'Nadendla', lat: 16.2833, lng: 80.6167, sunHours: 5.4 },
    { name: 'Guntur East', lat: 16.3000, lng: 80.4500, sunHours: 5.5 },
    { name: 'Guntur West', lat: 16.3000, lng: 80.4500, sunHours: 5.5 },
    { name: 'Prathipadu', lat: 16.2833, lng: 80.6167, sunHours: 5.4 },
    { name: 'Tadikonda', lat: 16.4000, lng: 80.6167, sunHours: 5.4 },
    { name: 'Phirangipuram', lat: 16.2833, lng: 80.6167, sunHours: 5.4 },
    { name: 'Veldurthi', lat: 16.2833, lng: 80.6167, sunHours: 5.4 },
    { name: 'Macherla', lat: 16.4833, lng: 79.4333, sunHours: 5.5 },
    { name: 'Durgi', lat: 16.2833, lng: 79.5167, sunHours: 5.5 },
    { name: 'Venkatachalam', lat: 16.2833, lng: 79.5167, sunHours: 5.5 },
    { name: 'Rentachintala', lat: 16.2833, lng: 79.5167, sunHours: 5.5 },
    { name: 'Karempudi', lat: 16.2833, lng: 79.5167, sunHours: 5.5 },
    { name: 'Pedakurapadu', lat: 16.2833, lng: 79.5167, sunHours: 5.5 },
    { name: 'Dachepalle', lat: 16.6167, lng: 79.8167, sunHours: 5.5 },
    { name: 'Bellamkonda', lat: 16.2833, lng: 79.5167, sunHours: 5.5 },
    { name: 'Atchampet', lat: 16.2833, lng: 79.5167, sunHours: 5.5 },
    { name: 'Krosuru', lat: 16.2833, lng: 79.5167, sunHours: 5.5 },
    { name: 'Rajupalem', lat: 16.4000, lng: 80.1500, sunHours: 5.4 },
    { name: 'Nekarikallu', lat: 16.2833, lng: 79.5167, sunHours: 5.5 },
    { name: 'Edlapadu', lat: 16.2833, lng: 79.5167, sunHours: 5.5 },
    { name: 'Nadigudem', lat: 16.2833, lng: 79.5167, sunHours: 5.5 },
    { name: 'Chilakaluripet', lat: 16.0833, lng: 80.1667, sunHours: 5.3 },
    { name: 'Nadendla', lat: 16.2833, lng: 80.6167, sunHours: 5.4 },
    { name: 'Ipuru', lat: 16.2833, lng: 80.6167, sunHours: 5.4 },
    { name: 'Kakumanu', lat: 16.2833, lng: 80.6167, sunHours: 5.4 },
    { name: 'Srisailam', lat: 16.0833, lng: 78.8667, sunHours: 5.5 },
    { name: 'Atmakur', lat: 15.8833, lng: 78.5833, sunHours: 5.6 },
    { name: 'Velugodu', lat: 15.8833, lng: 78.5833, sunHours: 5.6 },
    { name: 'Pamulapadu', lat: 15.8833, lng: 78.5833, sunHours: 5.6 },
    { name: 'Kurichedu', lat: 15.8833, lng: 78.5833, sunHours: 5.6 },
    { name: 'Maddikera', lat: 15.8833, lng: 78.5833, sunHours: 5.6 },
    { name: 'Gospadu', lat: 15.8833, lng: 78.5833, sunHours: 5.6 },
    { name: 'Ramagiri', lat: 15.8833, lng: 78.5833, sunHours: 5.6 },
    { name: 'Peda Kadubur', lat: 15.8833, lng: 78.5833, sunHours: 5.6 },
    { name: 'Chinna Kadubur', lat: 15.8833, lng: 78.5833, sunHours: 5.6 },
    { name: 'Yemmiganur', lat: 15.7667, lng: 77.4833, sunHours: 5.7 },
    { name: 'Kallur', lat: 15.7667, lng: 77.4833, sunHours: 5.7 },
    { name: 'Panyam', lat: 15.7667, lng: 77.4833, sunHours: 5.7 },
    { name: 'Gonegandla', lat: 15.7667, lng: 77.4833, sunHours: 5.7 },
    { name: 'Banaganapalle', lat: 15.7667, lng: 77.4833, sunHours: 5.7 },
    { name: 'Koilkuntla', lat: 15.2333, lng: 78.3167, sunHours: 5.7 },
    { name: 'Pedda Kadubur', lat: 15.8833, lng: 78.5833, sunHours: 5.6 },
    { name: 'Chinna Kadubur', lat: 15.8833, lng: 78.5833, sunHours: 5.6 },
    { name: 'Mahanandi', lat: 15.8833, lng: 78.5833, sunHours: 5.6 },
    { name: 'Gudibanda', lat: 15.8833, lng: 78.5833, sunHours: 5.6 },
    { name: 'Kothapeta', lat: 15.8833, lng: 78.5833, sunHours: 5.6 },
    { name: 'Uyyalawada', lat: 15.8833, lng: 78.5833, sunHours: 5.6 },
    { name: 'Chagalamarri', lat: 15.8833, lng: 78.5833, sunHours: 5.6 },
    { name: 'Thangella', lat: 15.8833, lng: 78.5833, sunHours: 5.6 },
    { name: 'Bethamcherla', lat: 15.8833, lng: 78.5833, sunHours: 5.6 },
    { name: 'Sirvel', lat: 15.8833, lng: 78.5833, sunHours: 5.6 },
    { name: 'Dornipadu', lat: 15.8833, lng: 78.5833, sunHours: 5.6 },
    { name: 'Veldurthi', lat: 16.2833, lng: 80.6167, sunHours: 5.4 },
    { name: 'Tadpatri', lat: 14.9167, lng: 78.0167, sunHours: 5.8 },
    { name: 'Putlur', lat: 14.9167, lng: 78.0167, sunHours: 5.8 },
    { name: 'Nallacheruvu', lat: 14.9167, lng: 78.0167, sunHours: 5.8 },
    { name: 'Peddapappur', lat: 14.9167, lng: 78.0167, sunHours: 5.8 },
    { name: 'Chinnapappur', lat: 14.9167, lng: 78.0167, sunHours: 5.8 },
    { name: 'Yellanur', lat: 14.9167, lng: 78.0167, sunHours: 5.8 },
    { name: 'Obuladevaracheruvu', lat: 14.9167, lng: 78.0167, sunHours: 5.8 },
    { name: 'Raptadu', lat: 14.9167, lng: 78.0167, sunHours: 5.8 },
    { name: 'C.K. Dinne', lat: 14.9167, lng: 78.0167, sunHours: 5.8 },
    { name: 'Gandlapenta', lat: 14.9167, lng: 78.0167, sunHours: 5.8 },
    { name: 'Ramapuram', lat: 14.9167, lng: 78.0167, sunHours: 5.8 },
    { name: 'Brahmasamudram', lat: 14.9167, lng: 78.0167, sunHours: 5.8 },
    { name: 'Chandrasekharapuram', lat: 14.9167, lng: 78.0167, sunHours: 5.8 },
    { name: 'Kanaganapalle', lat: 14.9167, lng: 78.0167, sunHours: 5.8 },
    { name: 'Amarapuram', lat: 14.9167, lng: 78.0167, sunHours: 5.8 },
    { name: 'Bukkapatnam', lat: 14.9167, lng: 78.0167, sunHours: 5.8 },
    { name: 'Garladinne', lat: 14.9167, lng: 78.0167, sunHours: 5.8 },
    { name: 'Parigi', lat: 14.9167, lng: 78.0167, sunHours: 5.8 },
    { name: 'Singanamala', lat: 14.9167, lng: 78.0167, sunHours: 5.8 },
    { name: 'Gooty', lat: 15.1167, lng: 77.6333, sunHours: 5.7 },
    { name: 'Pamidi', lat: 14.9500, lng: 77.5833, sunHours: 5.8 },
    { name: 'Gummagatta', lat: 14.9500, lng: 77.5833, sunHours: 5.8 },
    { name: 'Kalyandurg', lat: 14.5500, lng: 77.1167, sunHours: 5.8 },
    { name: 'Kambadur', lat: 14.5500, lng: 77.1167, sunHours: 5.8 },
    { name: 'Rayadurg', lat: 14.7000, lng: 76.8667, sunHours: 5.8 },
    { name: 'Kanekal', lat: 14.7000, lng: 76.8667, sunHours: 5.8 },
    { name: 'Uravakonda', lat: 14.9500, lng: 77.2500, sunHours: 5.8 },
    { name: 'Beluguppa', lat: 14.9500, lng: 77.2500, sunHours: 5.8 },
    { name: 'Anantapur Rural', lat: 14.6833, lng: 77.6000, sunHours: 5.8 },
    { name: 'Raptadu', lat: 14.9167, lng: 78.0167, sunHours: 5.8 },
    { name: 'Garladinne', lat: 14.9167, lng: 78.0167, sunHours: 5.8 },
    { name: 'Singanamala', lat: 14.9167, lng: 78.0167, sunHours: 5.8 },
    { name: 'Kundurpi', lat: 14.9167, lng: 78.0167, sunHours: 5.8 },
    { name: 'Atmakur', lat: 15.8833, lng: 78.5833, sunHours: 5.6 },
    { name: 'Vajrakarur', lat: 14.9167, lng: 78.0167, sunHours: 5.8 },
    { name: 'Gorantla', lat: 13.9833, lng: 77.7667, sunHours: 5.9 },
    { name: 'Gudibanda', lat: 13.8667, lng: 77.7000, sunHours: 5.9 },
    { name: 'Agali', lat: 13.8667, lng: 77.7000, sunHours: 5.9 },
    { name: 'Amasalu', lat: 13.8667, lng: 77.7000, sunHours: 5.9 },
    { name: 'Rolla', lat: 13.8667, lng: 77.7000, sunHours: 5.9 },
    { name: 'Narpala', lat: 13.8667, lng: 77.7000, sunHours: 5.9 },
    { name: 'Roddam', lat: 14.0833, lng: 77.8833, sunHours: 5.9 },
    { name: 'Chennekothapalle', lat: 14.0833, lng: 77.8833, sunHours: 5.9 },
    { name: 'Somandepalle', lat: 14.0833, lng: 77.8833, sunHours: 5.9 },
    { name: 'Kanaganapalle', lat: 14.0833, lng: 77.8833, sunHours: 5.9 },
    { name: 'Amarapuram', lat: 14.0833, lng: 77.8833, sunHours: 5.9 },
    { name: 'Peddavadugur', lat: 14.0833, lng: 77.8833, sunHours: 5.9 },
    { name: 'Vidapanakal', lat: 14.0833, lng: 77.8833, sunHours: 5.9 },
    { name: 'Brahmasamudram', lat: 14.0833, lng: 77.8833, sunHours: 5.9 },
    { name: 'Chandrasekharapuram', lat: 14.0833, lng: 77.8833, sunHours: 5.9 },
    { name: 'Setturu', lat: 14.0833, lng: 77.8833, sunHours: 5.9 },
    { name: 'Chintalapudi', lat: 17.0833, lng: 80.9667, sunHours: 5.3 },
    { name: 'T. Narasapuram', lat: 17.0833, lng: 80.9667, sunHours: 5.3 },
    { name: 'Dammapeta', lat: 17.0833, lng: 80.9667, sunHours: 5.3 },
    { name: 'Kallur', lat: 15.7667, lng: 77.4833, sunHours: 5.7 },
    { name: 'Cuddapah', lat: 14.4673, lng: 78.8242, sunHours: 6.0 },
    { name: 'Badvel', lat: 14.7333, lng: 79.0667, sunHours: 5.7 },
    { name: 'Rajampet', lat: 14.1833, lng: 79.1500, sunHours: 5.8 },
    { name: 'Kodur', lat: 14.5333, lng: 78.8667, sunHours: 5.9 },
    { name: 'Rayachoti', lat: 14.0667, lng: 78.7500, sunHours: 5.9 },
    { name: 'Lakkireddipalle', lat: 14.0667, lng: 78.7500, sunHours: 5.9 },
    { name: 'Ramapuram', lat: 14.0667, lng: 78.7500, sunHours: 5.9 },
    { name: 'Chinnamandem', lat: 14.0667, lng: 78.7500, sunHours: 5.9 },
  ];

  const systemTypes = [
    { value: 'grid-tie', label: 'Grid-Tie System', multiplier: 1 },
    { value: 'hybrid', label: 'Hybrid System', multiplier: 1.3 },
    { value: 'off-grid', label: 'Off-Grid System', multiplier: 1.6 }
  ];

  const calculateSystem = () => {
    setIsCalculating(true);

    setTimeout(() => {
      const selectedLocation = locations.find(loc => loc.name === location);
      const selectedSystem = systemTypes.find(sys => sys.value === systemType);

      if (!selectedLocation || !selectedSystem) return;

      // Solar calculations
      const unitsPerMonth = monthlyBill / 6; // Assuming ₹6 per unit
      const dailyUnits = unitsPerMonth / 30;
      const systemSize = Math.ceil((dailyUnits / selectedLocation.sunHours) * 1.2); // 20% buffer
      const maxSystemSize = Math.floor(roofArea / 100); // 100 sq ft per kW
      const finalSystemSize = Math.min(systemSize, maxSystemSize);

      const costPerKW = systemType === 'grid-tie' ? 70000 : systemType === 'hybrid' ? 90000 : 110000; // Updated costs
      const totalCost = finalSystemSize * costPerKW;
      const generatedUnits = finalSystemSize * selectedLocation.sunHours * 30;
      const monthlySavings = Math.min(generatedUnits * 6, monthlyBill * 0.95);
      const yearlySavings = monthlySavings * 12;
      const paybackPeriod = totalCost / yearlySavings;
      const carbonOffset = finalSystemSize * 1.5; // Tons of CO2 per year

      setResult({
        systemSize: finalSystemSize,
        totalCost,
        monthlyBill,
        monthlySavings,
        yearlySavings,
        paybackPeriod,
        carbonOffset
      });
      setIsCalculating(false);
    }, 1500);
  };

  useEffect(() => {
    if (monthlyBill > 0 && roofArea > 0) {
      const timer = setTimeout(() => {
        calculateSystem();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [monthlyBill, roofArea, location, systemType]);

  // Initial calculation on component mount
  useEffect(() => {
    calculateSystem();
  }, []);

  // Filter locations based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredLocations([]);
    } else {
      const filtered = locations.filter(loc =>
        loc.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredLocations(filtered);
    }
  }, [searchQuery]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section id="calculator" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Solar Savings{' '}
            <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Calculator
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Calculate your potential savings and see how solar can benefit your home or business
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Input Form */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-orange-500/20">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center mr-4">
                <CalcIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Enter Your Details</h3>
            </div>

            <div className="space-y-6">
              {/* Monthly Bill */}
              <div>
                <label className="block text-white font-semibold mb-3">
                  Monthly Electricity Bill
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="1000"
                    max="50000"
                    step="500"
                    value={monthlyBill}
                    onChange={(e) => setMonthlyBill(Number(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-gray-400 text-sm mt-2">
                    <span>₹1,000</span>
                    <span className="text-orange-400 font-bold text-lg">
                      {formatCurrency(monthlyBill)}
                    </span>
                    <span>₹50,000</span>
                  </div>
                </div>
              </div>

              {/* Roof Area */}
              <div>
                <label className="block text-white font-semibold mb-3">
                  Available Roof Area (sq ft)
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="200"
                    max="5000"
                    step="100"
                    value={roofArea}
                    onChange={(e) => setRoofArea(Number(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-gray-400 text-sm mt-2">
                    <span>200 sq ft</span>
                    <span className="text-teal-400 font-bold text-lg">
                      {roofArea} sq ft
                    </span>
                    <span>5,000 sq ft</span>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-white font-semibold mb-3">
                  Location
                </label>
                <button
                  onClick={() => setShowMapModal(true)}
                  className="w-full bg-gray-700 text-white rounded-xl px-4 py-3 border border-gray-600 hover:border-orange-400 focus:border-orange-400 focus:outline-none transition-colors flex items-center justify-between"
                >
                  <span className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-orange-400" />
                    {location} ({locationData.sunHours} sun hours/day)
                  </span>
                  <span className="text-gray-400 text-sm">Click to select location</span>
                </button>
              </div>

              {/* System Type */}
              <div>
                <label className="block text-white font-semibold mb-3">
                  System Type
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {systemTypes.map((system) => (
                    <button
                      key={system.value}
                      onClick={() => setSystemType(system.value)}
                      className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                        systemType === system.value
                          ? 'border-orange-400 bg-orange-500/20 text-orange-400'
                          : 'border-gray-600 text-gray-300 hover:border-gray-500'
                      }`}
                    >
                      <div className="text-sm font-semibold">{system.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {isCalculating ? (
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-orange-500/20 flex items-center justify-center h-96">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-white text-lg">Calculating your solar savings...</p>
                </div>
              </div>
            ) : result ? (
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-orange-500/20">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-green-500 rounded-xl flex items-center justify-center mr-4">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Your Solar Benefits</h3>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/30 rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300">
                    <Zap className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-orange-400">{result.systemSize} kW</div>
                    <div className="text-gray-300 text-sm">System Size</div>
                  </div>

                  <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300">
                    <Home className="h-8 w-8 text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-400">{formatCurrency(result.totalCost)}</div>
                    <div className="text-gray-300 text-sm">System Cost</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-700/50 rounded-xl">
                    <span className="text-gray-300">Monthly Savings</span>
                    <span className="text-teal-400 font-bold text-lg">{formatCurrency(result.monthlySavings)}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-700/50 rounded-xl">
                    <span className="text-gray-300">Yearly Savings</span>
                    <span className="text-green-400 font-bold text-lg">{formatCurrency(result.yearlySavings)}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-700/50 rounded-xl">
                    <span className="text-gray-300">Payback Period</span>
                    <span className="text-yellow-400 font-bold text-lg">{result.paybackPeriod.toFixed(1)} years</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-700/50 rounded-xl">
                    <span className="text-gray-300">CO₂ Offset (per year)</span>
                    <span className="text-emerald-400 font-bold text-lg">{result.carbonOffset.toFixed(1)} tons</span>
                  </div>
                </div>

                <button className="w-full mt-8 bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2">
                  <Download className="h-5 w-5" />
                  <span>Get Detailed Quote</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-gray-500/20 flex items-center justify-center h-96">
                <p className="text-gray-400 text-lg text-center">
                  Adjust the values above to see your solar savings calculation
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Map Modal */}
      {showMapModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-6 max-w-4xl w-full max-h-[90vh] overflow-hidden border border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">Select Location in Andhra Pradesh</h3>
              <button
                onClick={() => setShowMapModal(false)}
                className="text-gray-400 hover:text-white transition-colors p-2"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search for a location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-700 text-white rounded-xl px-10 py-3 border border-gray-600 focus:border-orange-400 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="h-96 mb-6 rounded-xl overflow-hidden">
              <MapContainer
                center={[16.5, 81.5]} // Center of Andhra Pradesh
                zoom={8}
                style={{ height: '100%', width: '100%' }}
                maxBounds={[[13.0, 76.0], [20.0, 87.0]]} // Andhra Pradesh bounds
                maxBoundsViscosity={1.0}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {filteredLocations.map((loc, index) => (
                  <Marker
                    key={index}
                    position={[loc.lat, loc.lng]}
                    eventHandlers={{
                      click: () => {
                        setSelectedLocation(loc);
                        setLocation(loc.name);
                        setLocationData(loc);
                        setShowMapModal(false);
                      },
                    }}
                  >
                    <Popup>
                      <div className="text-center">
                        <h4 className="font-semibold">{loc.name}</h4>
                        <p className="text-sm text-gray-600">Sun hours: {loc.sunHours}/day</p>
                        <button
                          onClick={() => {
                            setSelectedLocation(loc);
                            setLocation(loc.name);
                            setLocationData(loc);
                            setShowMapModal(false);
                          }}
                          className="mt-2 px-3 py-1 bg-orange-500 text-white text-sm rounded hover:bg-orange-600 transition-colors"
                        >
                          Select Location
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>

            <div className="text-center">
              <p className="text-gray-300 mb-4">
                {searchQuery.trim() === ''
                  ? 'Start typing to search for locations in Andhra Pradesh...'
                  : filteredLocations.length === 0
                  ? `No locations found for "${searchQuery}". Try a different search term.`
                  : `Showing ${filteredLocations.length} location${filteredLocations.length === 1 ? '' : 's'}. Click on any marker to select that location, or click "Select Location" in the popup.`
                }
              </p>
              <button
                onClick={() => setShowMapModal(false)}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-medium rounded-lg hover:from-orange-600 hover:to-yellow-600 transition-all duration-300"
              >
                Close Map
              </button>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(45deg, #f97316, #eab308);
          cursor: pointer;
          box-shadow: 0 0 20px rgba(249, 115, 22, 0.5);
        }
        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(45deg, #f97316, #eab308);
          cursor: pointer;
          border: none;
          box-shadow: 0 0 20px rgba(249, 115, 22, 0.5);
        }
      `}} />
    </section>
  );
};

export default Calculator;
