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
  const [showCityDropdown, setShowCityDropdown] = useState<boolean>(false);

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
                <div className="relative">
                  <button
                    onClick={() => setShowCityDropdown(!showCityDropdown)}
                    className="w-full bg-gray-700 text-white rounded-xl px-4 py-3 border border-gray-600 hover:border-orange-400 focus:border-orange-400 focus:outline-none transition-colors flex items-center justify-between"
                  >
                    <span className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-orange-400" />
                      {location} ({locationData.sunHours} sun hours/day)
                    </span>
                    <Search className="h-5 w-5 text-gray-400" />
                  </button>

                  {/* City Dropdown */}
                  {showCityDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-600 rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto">
                      <div className="p-2">
                        <input
                          type="text"
                          placeholder="Search cities..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600 focus:border-orange-400 focus:outline-none text-sm"
                        />
                      </div>
                      <div className="max-h-40 overflow-y-auto">
                        {(searchQuery.trim() === '' ? locations.slice(0, 10) : locations.filter(loc =>
                          loc.name.toLowerCase().includes(searchQuery.toLowerCase())
                        )).map((loc, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setLocation(loc.name);
                              setLocationData(loc);
                              setShowCityDropdown(false);
                              setSearchQuery('');
                            }}
                            className="w-full text-left px-4 py-3 hover:bg-gray-700 transition-colors border-b border-gray-700 last:border-b-0"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-white font-medium">{loc.name}</span>
                              <span className="text-gray-400 text-sm">{loc.sunHours} sun hrs/day</span>
                            </div>
                          </button>
                        ))}
                      </div>
                      <div className="p-2 border-t border-gray-700">
                        <button
                          onClick={() => {
                            setShowMapModal(true);
                            setShowCityDropdown(false);
                          }}
                          className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-2 px-4 rounded-lg hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 text-sm font-medium"
                        >
                          Open Map for More Locations
                        </button>
                      </div>
                    </div>
                  )}
                </div>
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

                <button
                  onClick={async () => {
                    // Generate detailed quotation PDF
                    const detailedQuotationHTML = `
                      <!DOCTYPE html>
                      <html>
                        <head>
                          <title>Detailed Solar Quote - Sriyaveda Solar Energies</title>
                          <style>
                            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
                            * { box-sizing: border-box; }
                            body {
                              font-family: 'Inter', Arial, sans-serif;
                              margin: 0;
                              padding: 20px;
                              background: linear-gradient(to bottom, #111827, #000000);
                              color: #ffffff;
                              -webkit-print-color-adjust: exact;
                              print-color-adjust: exact;
                            }
                            .quotation-container {
                              max-width: 900px;
                              margin: 0 auto;
                              background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
                              border: 2px solid #FFB400;
                              border-radius: 12px;
                              overflow: hidden;
                              box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                              page-break-inside: avoid;
                              font-family: 'Inter', Arial, sans-serif;
                              line-height: 1.4;
                            }
                            .header {
                              background: linear-gradient(135deg, #FFB400, #0AA6F1);
                              padding: 20px;
                              text-align: center;
                              color: white;
                              position: relative;
                            }
                            .logo-section {
                              display: flex;
                              align-items: center;
                              justify-content: center;
                              margin-bottom: 15px;
                            }
                            .logo {
                              width: 70px;
                              height: 70px;
                              margin-right: 15px;
                              border-radius: 8px;
                              background: white;
                              padding: 5px;
                            }
                            .company-name {
                              font-size: 28px;
                              font-weight: 700;
                              margin: 0;
                              text-shadow: 0 1px 2px rgba(0,0,0,0.2);
                            }
                            .company-address {
                              font-size: 14px;
                              opacity: 0.9;
                              margin: 5px 0 0 0;
                            }
                            .company-details {
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              margin-top: 10px;
                              font-size: 12px;
                              background: rgba(255,255,255,0.1);
                              padding: 10px;
                              border-radius: 6px;
                            }
                            .quotation-meta {
                              display: grid;
                              grid-template-columns: 1fr 1fr 1fr;
                              gap: 8px;
                              font-size: 11px;
                              margin-top: 8px;
                            }
                            .meta-item {
                              background: rgba(255,255,255,0.1);
                              padding: 8px;
                              border-radius: 4px;
                            }
                            .customer-section {
                              padding: 20px;
                              border-bottom: 1px solid #444;
                            }
                            .section-title {
                              color: #1B3B5F;
                              font-size: 18px;
                              font-weight: 600;
                              margin-bottom: 15px;
                              text-transform: uppercase;
                              letter-spacing: 0.5px;
                            }
                            .customer-grid {
                              display: grid;
                              grid-template-columns: 1fr 1fr;
                              gap: 12px;
                            }
                            .customer-field {
                              background: #333;
                              padding: 12px;
                              border-radius: 6px;
                              border-left: 3px solid #0AA6F1;
                            }
                            .field-label {
                              font-size: 10px;
                              color: #ccc;
                              text-transform: uppercase;
                              letter-spacing: 0.5px;
                              margin-bottom: 3px;
                              font-weight: 600;
                            }
                            .field-value {
                              font-size: 14px;
                              font-weight: 500;
                              color: #ffffff;
                            }
                            .system-details-section {
                              padding: 20px;
                              border-bottom: 1px solid #444;
                            }
                            .system-details-grid {
                              display: grid;
                              grid-template-columns: 1fr 1fr 1fr;
                              gap: 15px;
                            }
                            .system-detail-item {
                              background: #333;
                              padding: 15px;
                              border-radius: 6px;
                              text-align: center;
                              border: 1px solid #555;
                            }
                            .system-detail-label {
                              font-size: 12px;
                              color: #ccc;
                              text-transform: uppercase;
                              letter-spacing: 0.5px;
                              margin-bottom: 6px;
                            }
                            .system-detail-value {
                              font-size: 16px;
                              font-weight: 600;
                              color: #0AA6F1;
                            }
                            .financial-breakdown-section {
                              padding: 20px;
                              border-bottom: 1px solid #444;
                            }
                            .financial-table {
                              width: 100%;
                              border-collapse: collapse;
                              margin-top: 15px;
                            }
                            .financial-table th,
                            .financial-table td {
                              padding: 12px;
                              text-align: left;
                              border-bottom: 1px solid #555;
                            }
                            .financial-table th {
                              background: #333;
                              color: #FFB400;
                              font-weight: 600;
                              text-transform: uppercase;
                              font-size: 12px;
                              letter-spacing: 0.5px;
                            }
                            .financial-table td {
                              color: #ffffff;
                              font-size: 13px;
                            }
                            .financial-table .total-row {
                              background: #FFB400;
                              color: #000;
                              font-weight: 700;
                            }
                            .benefits-section {
                              padding: 20px;
                              border-bottom: 1px solid #444;
                            }
                            .benefits-grid {
                              display: grid;
                              grid-template-columns: 1fr 1fr;
                              gap: 15px;
                            }
                            .benefit-item {
                              background: #333;
                              padding: 15px;
                              border-radius: 6px;
                              border-left: 3px solid #FFB400;
                            }
                            .benefit-title {
                              font-size: 14px;
                              font-weight: 600;
                              color: #FFB400;
                              margin-bottom: 6px;
                            }
                            .benefit-value {
                              font-size: 13px;
                              color: #ffffff;
                            }
                            .roi-section {
                              padding: 20px;
                              border-bottom: 1px solid #444;
                            }
                            .roi-grid {
                              display: grid;
                              grid-template-columns: 1fr 1fr 1fr;
                              gap: 15px;
                            }
                            .roi-item {
                              background: #333;
                              padding: 15px;
                              border-radius: 6px;
                              text-align: center;
                            }
                            .roi-label {
                              font-size: 12px;
                              color: #ccc;
                              text-transform: uppercase;
                              letter-spacing: 0.5px;
                              margin-bottom: 6px;
                            }
                            .roi-value {
                              font-size: 18px;
                              font-weight: 700;
                              color: #0AA6F1;
                            }
                            .notes-section {
                              padding: 20px;
                              border-bottom: 1px solid #444;
                            }
                            .notes-box {
                              background: #333;
                              border: 1px solid #555;
                              padding: 15px;
                              border-radius: 6px;
                            }
                            .notes-title {
                              color: #FFB400;
                              font-size: 14px;
                              font-weight: 600;
                              margin-bottom: 8px;
                            }
                            .notes-text {
                              color: #ccc;
                              font-size: 12px;
                              line-height: 1.5;
                            }
                            .signature-section {
                              padding: 20px;
                            }
                            .signature-grid {
                              display: grid;
                              grid-template-columns: 1fr 1fr;
                              gap: 50px;
                            }
                            .signature-box {
                              text-align: center;
                            }
                            .signature-line {
                              border-bottom: 1px solid #666;
                              margin: 40px 0 10px 0;
                            }
                            .signature-label {
                              color: #ccc;
                              font-size: 12px;
                              font-weight: 500;
                            }
                            .footer {
                              background: #1B3B5F;
                              padding: 15px;
                              text-align: center;
                              color: white;
                              font-size: 11px;
                            }
                            @media print {
                              body { margin: 0; }
                              .quotation-container { box-shadow: none; border: none; }
                            }
                          </style>
                        </head>
                        <body>
                          <div class="quotation-container">
                            <!-- Header -->
                            <div class="header">
                              <div class="logo-section">
                                <img src="/logo.png" alt="Sriyaveda Solar Energies Logo" class="logo">
                                <div>
                                  <h1 class="company-name">SRIYAVEDA SOLAR ENERGIES</h1>
                                  <p class="company-address">F No-403, Yalakkaya Street, Near Clock Tower, Eluru - 534001, Andhra Pradesh</p>
                                </div>
                              </div>
                              <div class="company-details">
                                <div>
                                  <strong>Cell:</strong> 9440788850 | <strong>Email:</strong> sriyavedasolarenergies@gmail.com | <strong>Website:</strong> sriyavedasolarenergies.in
                                </div>
                              </div>
                              <div class="quotation-meta">
                                <div class="meta-item">
                                  <strong>Quote Date:</strong> ${new Date().toLocaleDateString('en-IN')}
                                </div>
                                <div class="meta-item">
                                  <strong>Quote No:</strong> DQ-${Date.now().toString().slice(-6)}
                                </div>
                                <div class="meta-item">
                                  <strong>Location:</strong> ${location}
                                </div>
                              </div>
                            </div>

                            <!-- Customer Details -->
                            <div class="customer-section">
                              <h2 class="section-title">Customer Details</h2>
                              <div class="customer-grid">
                                <div class="customer-field">
                                  <div class="field-label">Name</div>
                                  <div class="field-value">********</div>
                                </div>
                                <div class="customer-field">
                                  <div class="field-label">Address</div>
                                  <div class="field-value">********</div>
                                </div>
                                <div class="customer-field">
                                  <div class="field-label">Phone</div>
                                  <div class="field-value">********</div>
                                </div>
                                <div class="customer-field">
                                  <div class="field-label">Email</div>
                                  <div class="field-value">********</div>
                                </div>
                              </div>
                            </div>

                            <!-- System Details -->
                            <div class="system-details-section">
                              <h2 class="section-title">Solar System Details</h2>
                              <div class="system-details-grid">
                                <div class="system-detail-item">
                                  <div class="system-detail-label">System Size</div>
                                  <div class="system-detail-value">${result.systemSize} kW</div>
                                </div>
                                <div class="system-detail-item">
                                  <div class="system-detail-label">System Type</div>
                                  <div class="system-detail-value">${systemTypes.find(sys => sys.value === systemType)?.label}</div>
                                </div>
                                <div class="system-detail-item">
                                  <div class="system-detail-label">Location</div>
                                  <div class="system-detail-value">${location}</div>
                                </div>
                                <div class="system-detail-item">
                                  <div class="system-detail-label">Daily Generation</div>
                                  <div class="system-detail-value">${(result.systemSize * locationData.sunHours).toFixed(1)} kWh</div>
                                </div>
                                <div class="system-detail-item">
                                  <div class="system-detail-label">Monthly Generation</div>
                                  <div class="system-detail-value">${(result.systemSize * locationData.sunHours * 30).toFixed(0)} kWh</div>
                                </div>
                                <div class="system-detail-item">
                                  <div class="system-detail-label">Sun Hours/Day</div>
                                  <div class="system-detail-value">${locationData.sunHours} hours</div>
                                </div>
                              </div>
                            </div>

                            <!-- Financial Breakdown -->
                            <div class="financial-breakdown-section">
                              <h2 class="section-title">Financial Breakdown</h2>
                              <table class="financial-table">
                                <thead>
                                  <tr>
                                    <th>Description</th>
                                    <th>Amount</th>
                                    <th>Notes</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>Solar PV System (${result.systemSize} kW)</td>
                                    <td>₹${(result.totalCost * 0.7).toLocaleString('en-IN')}</td>
                                    <td>Includes panels, inverter, wiring</td>
                                  </tr>
                                  <tr>
                                    <td>Installation & Civil Work</td>
                                    <td>₹${(result.totalCost * 0.2).toLocaleString('en-IN')}</td>
                                    <td>Mounting structure, foundation</td>
                                  </tr>
                                  <tr>
                                    <td>Government Subsidy</td>
                                    <td>-₹${(result.totalCost * 0.3).toLocaleString('en-IN')}</td>
                                    <td>30% MNRE subsidy</td>
                                  </tr>
                                  <tr>
                                    <td>Transportation & Miscellaneous</td>
                                    <td>₹${(result.totalCost * 0.1).toLocaleString('en-IN')}</td>
                                    <td>Delivery and other charges</td>
                                  </tr>
                                  <tr class="total-row">
                                    <td><strong>Total Investment</strong></td>
                                    <td><strong>₹${result.totalCost.toLocaleString('en-IN')}</strong></td>
                                    <td>After subsidy</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>

                            <!-- Benefits -->
                            <div class="benefits-section">
                              <h2 class="section-title">Financial Benefits</h2>
                              <div class="benefits-grid">
                                <div class="benefit-item">
                                  <div class="benefit-title">Monthly Savings</div>
                                  <div class="benefit-value">₹${result.monthlySavings.toLocaleString('en-IN')}</div>
                                </div>
                                <div class="benefit-item">
                                  <div class="benefit-title">Yearly Savings</div>
                                  <div class="benefit-value">₹${result.yearlySavings.toLocaleString('en-IN')}</div>
                                </div>
                                <div class="benefit-item">
                                  <div class="benefit-title">Payback Period</div>
                                  <div class="benefit-value">${result.paybackPeriod.toFixed(1)} years</div>
                                </div>
                                <div class="benefit-item">
                                  <div class="benefit-title">25-Year Savings</div>
                                  <div class="benefit-value">₹${(result.yearlySavings * 25).toLocaleString('en-IN')}</div>
                                </div>
                                <div class="benefit-item">
                                  <div class="benefit-title">CO₂ Reduction</div>
                                  <div class="benefit-value">${result.carbonOffset.toFixed(1)} tons/year</div>
                                </div>
                                <div class="benefit-item">
                                  <div class="benefit-title">Return on Investment</div>
                                  <div class="benefit-value">${((result.yearlySavings / result.totalCost) * 100).toFixed(1)}% per year</div>
                                </div>
                              </div>
                            </div>

                            <!-- ROI Projection -->
                            <div class="roi-section">
                              <h2 class="section-title">10-Year ROI Projection</h2>
                              <div class="roi-grid">
                                <div class="roi-item">
                                  <div class="roi-label">Year 1 Savings</div>
                                  <div class="roi-value">₹${result.yearlySavings.toLocaleString('en-IN')}</div>
                                </div>
                                <div class="roi-item">
                                  <div class="roi-label">Year 5 Savings</div>
                                  <div class="roi-value">₹${(result.yearlySavings * 5).toLocaleString('en-IN')}</div>
                                </div>
                                <div class="roi-item">
                                  <div class="roi-label">Year 10 Savings</div>
                                  <div class="roi-value">₹${(result.yearlySavings * 10).toLocaleString('en-IN')}</div>
                                </div>
                              </div>
                            </div>

                            <!-- Notes -->
                            <div class="notes-section">
                              <div class="notes-box">
                                <div class="notes-title">Important Terms & Conditions</div>
                                <div class="notes-text">
                                  • This quotation is valid for 30 days from the date of issue<br>
                                  • System sizing is based on your current electricity consumption and available roof area<br>
                                  • Actual generation may vary based on weather conditions and system orientation<br>
                                  • Government subsidies are subject to eligibility and availability<br>
                                  • Installation timeline: 15-20 working days after payment<br>
                                  • 25-year comprehensive warranty on solar panels<br>
                                  • 5-year warranty on inverter and 2-year warranty on other components<br>
                                  • Terms and conditions apply. Contact us for detailed project proposal
                                </div>
                              </div>
                            </div>

                            <!-- Signature -->
                            <div class="signature-section">
                              <div class="signature-grid">
                                <div class="signature-box">
                                  <div class="signature-line"></div>
                                  <div class="signature-label">Customer Signature</div>
                                </div>
                                <div class="signature-box">
                                  <div class="signature-line"></div>
                                  <div class="signature-label">Authorized Signatory</div>
                                  <div style="margin-top: 15px; font-size: 10px; color: #ccc;">
                                    Sriyaveda Solar Energies
                                  </div>
                                </div>
                              </div>
                            </div>

                            <!-- Footer -->
                            <div class="footer">
                              <strong>SRIYAVEDA SOLAR ENERGIES</strong> | F No-403, Yalakkaya Street, Near Clock Tower, Eluru - 534001 | Cell: 9440788850
                            </div>
                          </div>
                        </body>
                      </html>
                    `;

                    const element = document.createElement('div');
                    element.innerHTML = detailedQuotationHTML;
                    document.body.appendChild(element);

                    const { default: html2pdf } = await import('html2pdf.js');

                    const options = {
                      margin: 0.5,
                      filename: `Detailed_Quote_Sriyaveda_Solar_${location}_${new Date().toISOString().split('T')[0]}.pdf`,
                      image: { type: 'jpeg' as const, quality: 0.98 },
                      html2canvas: { scale: 2, useCORS: true },
                      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait', compress: true }
                    } as any;

                    await html2pdf().set(options).from(element).save();
                    document.body.removeChild(element);
                  }}
                  className="w-full mt-8 bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
                >
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
