pragma solidity ^0.4.24;

contract HealthContract {
    struct indicator {
        uint8 weight;
        uint8 heartbeat;
        bool confirmedByCustomer;
        bool confirmedByMentor;
    }
    
    indicator targetIndicator;
    indicator startIndicator;
    indicator currentIndicator;
    
    address public customer;
    address public healthMentor;
    address public fitnessEquipment;
    
    string public projectName;
    
    uint public price = 1 ether;
    
    bool public paied;
    
    event indicator_record(uint8 weight, uint8 heartbeat);
    event meet_target(uint8 weight, uint8 heartbeat);

    
    modifier onlyFitnessEquipment() {
        require(msg.sender == fitnessEquipment);
        _;
    }
    
    modifier onlyHealthMentor() {
        require(msg.sender == healthMentor);
        _;
    }
    
    constructor (string _projectName, address _fitnessEquipment, address _healthMentor) public {
        projectName = _projectName;
        startIndicator.weight = 85;
        startIndicator.heartbeat = 65;
        fitnessEquipment = _fitnessEquipment;
        healthMentor = _healthMentor;
    }
    
    function recordHealthData(uint8 _weight, uint8 _heartbeat) public onlyFitnessEquipment {
        currentIndicator.weight = _weight;
        currentIndicator.heartbeat = _heartbeat;
        emit indicator_record(_weight, _heartbeat);
        
        if (_weight <= targetIndicator.weight && _heartbeat <= targetIndicator.heartbeat) {
            emit meet_target(targetIndicator.weight, targetIndicator.heartbeat);
        }
    }
    
    function startProject() public payable {
        require(msg.value == price);
        require(!paied);
        customer = msg.sender;
        paied = true;
        startIndicator.confirmedByCustomer = true;
        targetIndicator.confirmedByCustomer = true;
    }
    
    function confirmProject() public {
        require(!startIndicator.confirmedByMentor && !targetIndicator.confirmedByMentor);
        startIndicator.confirmedByMentor = true;
        targetIndicator.confirmedByMentor = true;
    }
    
    
    
    
    
    
    
    
}