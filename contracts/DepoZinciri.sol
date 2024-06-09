// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract DepoZinciri {
    enum NeedStatus { NotConfirmed, Confirmed, Delivered }
    enum SupportStatus { Confirmed, OnTheWay, OnTheWarehouse, Delivered }

    struct NeedStatusChange {
        uint256 timestamp;
        NeedStatus status;
    }

    struct SupportStatusChange {
        uint256 timestamp;
        SupportStatus status;
    }

    struct Need {
        uint256 needId;
        NeedStatusChange[] statusHistory;
    }

    struct Support {
        uint256 supportId;
        SupportStatusChange[] statusHistory;
    }

    mapping(uint256 => Need) private needsMapping;
    mapping(uint256 => Support) private supportsMapping;

    function updateNeedStatus(uint256 _needId, NeedStatus _status) public {
        Need storage need = needsMapping[_needId];
        if (need.needId == 0) {
            need.needId = _needId;
        }
        need.statusHistory.push(NeedStatusChange(block.timestamp, _status));
    }

    function updateSupportStatus(uint256 _supportId, SupportStatus _status) public {
        Support storage support = supportsMapping[_supportId];
        if (support.supportId == 0) {
            support.supportId = _supportId;
        }
        support.statusHistory.push(SupportStatusChange(block.timestamp, _status));
    }

    function getNeedStatus(uint256 _needId) public view returns (NeedStatus) {
        require(needsMapping[_needId].needId != 0, "Need does not exist");
        uint256 length = needsMapping[_needId].statusHistory.length;
        return needsMapping[_needId].statusHistory[length - 1].status;
    }

    function getSupportStatus(uint256 _supportId) public view returns (SupportStatus) {
        require(supportsMapping[_supportId].supportId != 0, "Support does not exist");
        uint256 length = supportsMapping[_supportId].statusHistory.length;
        return supportsMapping[_supportId].statusHistory[length - 1].status;
    }

    function getHistoricalNeedStatus(uint256 _needId) public view returns (NeedStatusChange[] memory) {
        require(needsMapping[_needId].needId != 0, "Need does not exist");
        return needsMapping[_needId].statusHistory;
    }

    function getHistoricalSupportStatus(uint256 _supportId) public view returns (SupportStatusChange[] memory) {
        require(supportsMapping[_supportId].supportId != 0, "Support does not exist");
        return supportsMapping[_supportId].statusHistory;
    }
}
